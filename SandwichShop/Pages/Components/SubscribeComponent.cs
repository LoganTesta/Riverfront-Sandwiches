using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;


using MailKit.Net.Smtp;
using MailKit.Security;
using MimeKit;


using Microsoft.AspNetCore.Html;
//using Microsoft.AspNetCore.ViewComponents;


namespace SandwichShop.Components
{
    public class SubscribeComponent : ViewComponent
    {

        public string Message { get; set; } = "";
        [BindProperty]
        public string userNameSubscribe { get; set; }


        public async Task<IViewComponentResult> InvokeAsync() { 

            string userNameSubscribe = "";
            string userEmailSubscribe = "";
            bool hasException = false;

            bool validForm = true;
                string contactFormResponse = "";

            try
            {
                userNameSubscribe = "" + System.Web.HttpUtility.HtmlEncode(Request.Form["userNameSubscribe"]);
                userEmailSubscribe = "" + System.Web.HttpUtility.HtmlEncode(Request.Form["userEmailSubscribe"]);
            }
            catch (Exception)
            {
                hasException = true;
                Message = " ";
            }

            if (hasException == false)
            {
                if (userNameSubscribe == "" || userEmailSubscribe == "")
                {
                    validForm = false;
                    contactFormResponse += "Sorry, form not valid, please fill in all required (**) input fields. ";
                }

                if (validForm)
                {
                    if (!userEmailSubscribe.Contains("@"))
                    {
                        validForm = false;
                        contactFormResponse += "Email must contain at least 1 @ symbol. ";
                    }

                    if (!userEmailSubscribe.Contains("."))
                    {
                        validForm = false;
                        contactFormResponse += "Email must contain at least 1 period (.). ";
                    }

                    int atSymbolIndex = userEmailSubscribe.IndexOf("@");
                    int lastPeriodSymbol = userEmailSubscribe.LastIndexOf(".");

                    if (!(atSymbolIndex <= lastPeriodSymbol))
                    {
                        validForm = false;
                        contactFormResponse += "For the email you must have at least 1 @ symbol before the last period (.). ";
                    }
                }


                if (!validForm)
                {
                    contactFormResponse += "";
                }
                else if (validForm)
                {
                    contactFormResponse += "Valid input";
                    //Construct the Email
                    string FromEmail = userEmailSubscribe;
                    string FromName = userNameSubscribe;
                    string ToEmail = "contact@riverfrontsandwiches.com";
                    string EmailSubject = "Please Subscribe me for emails.";

                    string BodyEmail = "Subscribe this user please.";

                    var emailMessage = new MimeMessage();
                    emailMessage.From.Add(new MailboxAddress(FromName, FromEmail));
                    emailMessage.To.Add(new MailboxAddress("Riverfront Sandwiches", ToEmail));

                    emailMessage.Subject = EmailSubject;
                    BodyBuilder emailBody = new BodyBuilder();
                    emailBody.TextBody = "" + BodyEmail;
                    emailMessage.Body = emailBody.ToMessageBody();

                    using (var destinationSmtp = new SmtpClient())
                    {
                        destinationSmtp.Connect("cmx5.my-hosting-panel.com", 465, true);
                        destinationSmtp.Authenticate("youremail", "yourpassword");
                        destinationSmtp.Send(emailMessage);
                        destinationSmtp.Disconnect(true);
                        destinationSmtp.Dispose();

                        contactFormResponse = "Thank you " + userNameSubscribe + ", we look forward to reading your comments and our reply will be sent to your email at: " + userEmailSubscribe + ".";
                    }
                }
            }
            Message = contactFormResponse;

            return View("Default", Message);
        }

        //public string Invoke()
        //{
        //    return "" + Message;
        //}

    }
}