using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc.RazorPages;


using MailKit.Net.Smtp;
using MailKit.Security;
using MimeKit;

//using System.Text; //For StringBuilder

namespace SandwichShop.Pages
{
    public class ContactModel : PageModel
    {
        public string Message { get; set; }
        
        public void OnGet()
        {
       
        }

        public void OnPostContactSection()
        {
            bool validForm = true;
            string contactFormResponse = "";

            string userNameContact = "";
            string userEmailContact = "";
            string userSubjectContact = "";
            string userCommentsContact = "";
            try
            {
                userNameContact = System.Web.HttpUtility.HtmlEncode(Request.Form["userName"]);
                userEmailContact = System.Web.HttpUtility.HtmlEncode(Request.Form["userEmail"]);
                userSubjectContact = System.Web.HttpUtility.HtmlEncode(Request.Form["userSubject"]);
                userCommentsContact = System.Web.HttpUtility.HtmlEncode(Request.Form["userComments"]);
            }
            catch (Exception){
                userNameContact = "";
                userEmailContact = "";
                userSubjectContact = "";
                userCommentsContact = "";
            }



            if (userNameContact == "" || userEmailContact == "" || userCommentsContact == "")
            {
                validForm = false;
                contactFormResponse = "Sorry, form not valid, please fill in all required (**) input fields. ";
            }

            if(validForm)
            {
                if (!userEmailContact.Contains("@"))
                {
                    validForm = false;
                    contactFormResponse += "Email must contain at least 1 @ symbol. ";
                }

                if (!userEmailContact.Contains("."))
                {
                    validForm = false;
                    contactFormResponse += "Email must contain at least 1 period (.). ";
                }

                int atSymbolIndex = userEmailContact.IndexOf("@");
                int lastPeriodSymbol = userEmailContact.LastIndexOf(".");
                int userEmailLength = userEmailContact.Length;


                //Ensure at least 1 char before first @ symbol.
                if (!(atSymbolIndex > 0))
                {
                    validForm = false;
                    contactFormResponse += "Email must have at least one chracter before first @. ";
                }

                //Verify that at least 1 @ symbol comes before the last period, and that there is at least
                //one char in between them.
                if (!(atSymbolIndex + 1 < lastPeriodSymbol))
                {
                    validForm = false;
                    contactFormResponse += "Email must have at least 1 @ symbol before the last period (.). ";
                }

                //Verify that there are at least 2 chars after the last period.
                if (!(lastPeriodSymbol + 2 < userEmailLength))
                {
                    validForm = false;
                    contactFormResponse += "Email must contain at least two characters after the last period (.). ";
                }
            }



            if (!validForm)
            {
                contactFormResponse += "";
            }
           else if (validForm)
            {

                //Construct the Email
                string FromName = userNameContact;
                string FromEmail = userEmailContact;
                string ToEmail = "contact@riverfrontsandwiches.com";
                string EmailSubject = userSubjectContact;

                string BodyEmail = "<strong>From:</strong> " + userNameContact + "<br />";
                BodyEmail += "<strong>Email:</strong> " + userEmailContact + "<br />";
                BodyEmail += "<strong>Subject:</strong> " + userSubjectContact + "<br />";
                BodyEmail += "<strong>Message/Comments:</strong> " + userCommentsContact;

           
                var emailMessage = new MimeMessage();
                emailMessage.From.Add(new MailboxAddress(FromName, FromEmail));
                emailMessage.To.Add(new MailboxAddress("Riverfront Sandwiches", ToEmail));

                emailMessage.Subject = EmailSubject;
                BodyBuilder emailBody = new BodyBuilder();
                emailBody.HtmlBody = "" + BodyEmail;
                emailMessage.Body = emailBody.ToMessageBody();

                using (var destinationSmtp = new SmtpClient())
                {
                    destinationSmtp.Connect("cmx5.my-hosting-panel.com", 465, true);
                    destinationSmtp.Authenticate("youremail", "yourpassword");
                    destinationSmtp.Send(emailMessage);
                    destinationSmtp.Disconnect(true);
                    destinationSmtp.Dispose();

                    contactFormResponse = "Thank you " + userNameContact + ", we look forward to reading your comments and our reply will be sent to your email at: " + userEmailContact + ".";
                }              
            }

            ViewData["Message"] = ""+contactFormResponse;
        }
    }
}
