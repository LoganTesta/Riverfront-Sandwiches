using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;


using MailKit.Net.Smtp;
using MailKit.Security;
using MimeKit;


namespace RiverfrontSandwiches.Components
{
    public class SubscribeComponent : ViewComponent
    {

        public string Message { get; set; } = "";
        [BindProperty]
        public string userName { get; set; }


        public async Task<IViewComponentResult> InvokeAsync() { 

            string userName = "";
            string userEmail = "";
            bool hasException = false;

            bool validForm = true;
                string contactFormResponse = "";

            try
            {
                userName = "" + System.Web.HttpUtility.HtmlEncode(Request.Form["userNameSubscribe"]);
                userEmail = "" + System.Web.HttpUtility.HtmlEncode(Request.Form["userEmailSubscribe"]);
            }
            catch (Exception)
            {
                hasException = true;
                Message = "";
            }


            if (hasException == false)
            {
                if (userName == "" || userEmail == "")
                {
                    validForm = false;
                    contactFormResponse += "Sorry, form not valid, please fill in all required (**) input fields. ";
                }

                if (validForm)
                {
                    if (!userEmail.Contains("@"))
                    {
                        validForm = false;
                        contactFormResponse += "Email must contain at least 1 @ symbol. ";
                    }

                    if (!userEmail.Contains("."))
                    {
                        validForm = false;
                        contactFormResponse += "Email must contain at least 1 period (.). ";
                    }

                    int atSymbolIndex = userEmail.IndexOf("@");
                    int lastPeriodSymbol = userEmail.LastIndexOf(".");

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
                    string FromEmail = userEmail;
                    string FromName = userName;
                    string ToEmail = "contact@riverfrontsandwiches.com";
                    string EmailSubject = "Please Subscribe me for emails.";

                    string BodyEmail = "Subscribe this user please.";

                    var emailMessage = new MimeMessage();
                    emailMessage.From.Add(new MailboxAddress(FromName, ToEmail));
                    emailMessage.To.Add(new MailboxAddress("Riverfront Sandwiches", ToEmail));

                    emailMessage.Subject = EmailSubject;
                    BodyBuilder emailBody = new BodyBuilder();
                    emailBody.TextBody = "" + BodyEmail;
                    emailMessage.Body = emailBody.ToMessageBody();

                    using (var destinationSmtp = new SmtpClient())
                    {
                        destinationSmtp.Connect("p1432.use1.mysecurecloudhost.com", 465, true);
                        destinationSmtp.Authenticate("youremail", "yourpassword");
                        destinationSmtp.Send(emailMessage);
                        destinationSmtp.Disconnect(true);
                        destinationSmtp.Dispose();

                        contactFormResponse = "Thank you <strong><em>" + userName + "</em></strong>!<br /> We look forward to reading your comments and our reply will be sent to your email at: <strong><em>" + userEmail + "</em></strong>.";
                    }
                }
            }
            Message = contactFormResponse;

            return View("Default", Message);
        }
    }
}