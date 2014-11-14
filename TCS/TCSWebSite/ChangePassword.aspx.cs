using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.IO;
using System.Xml;
using System.Text;
using System.Web.UI;
using System.Web.UI.WebControls;
using TCSWebSite;
using TCSWebSite.TCSWcfServiceReference;
using System.Xml.Serialization;

namespace TCSWebSite
{
    public partial class ChangePassword : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            Ajax.Utility.RegisterTypeForAjax(typeof(ChangePassword));
        }


        [Ajax.AjaxMethod()]
        public string ChangePwd(string _userId, string _userPassword, string _newPassword, string _applicationId)
        {
            InterfaceServiceTCSClient client = new InterfaceServiceTCSClient(); 
            
            dc_User _user = client.UsrUpdatePassword(_userId, _userPassword.ToUpper(), _newPassword.ToUpper(),  _applicationId);
            client.Close();

            string xmlResult = null;
            MemoryStream ms = new MemoryStream();
            XmlTextWriter xmltw = new XmlTextWriter(ms, Encoding.UTF8);
            XmlSerializer xs = new XmlSerializer(typeof(dc_User));
            xs.Serialize(xmltw, _user);
            ms = (MemoryStream)xmltw.BaseStream;
            xmlResult = cs.UTF8Helper.UTF8ByteArrayToString(ms.ToArray()).ToString();
            xmlResult = xmlResult.Substring(1, xmlResult.Length - 1);
            
            return xmlResult;
        }


    }
}
