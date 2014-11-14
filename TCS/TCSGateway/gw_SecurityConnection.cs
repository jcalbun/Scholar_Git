using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using TCSBusinessEntities;
using TCSDataClasses;
using System.Configuration;

namespace TCSGateway
{
    public class gw_SecurityConnection
    {
        private be_Log _log;
        private SecurityDBDataContext _securityDBDataContext;

        public SecurityDBDataContext securityDBDataContext
        {
            get { return _securityDBDataContext; }
            set { _securityDBDataContext = value; }
        }

        public be_Log log
        {
            get { return _log; }
            set { _log = value; }
        }

        public gw_SecurityConnection()
        {
            be_Log _be_Log = new be_Log();
            log = _be_Log;
        }


        public void Connection()
        {
            string securityConnectionString = null;


            securityConnectionString = ConfigurationManager.ConnectionStrings["SecurityConnectionString"].ToString();

            if ((securityConnectionString == " ") || (securityConnectionString == null))
            {
                be_Log _log = new be_Log();
                _log.status = "ERROR";
                _log.module = "gw_SecurityConnection";
                _log.messages.Add("Invalid Connection String for Security");
                log = _log;
            }
            else
            {
                try
                {
                    SecurityDBDataContext dataContext = new SecurityDBDataContext(securityConnectionString);
                    securityDBDataContext = dataContext;

                }
                catch (Exception e)
                {
                    be_Log _log = new be_Log();
                    _log.status = "ERROR";
                    _log.messages.Add("Invalid Connection String for Security");
                    _log.messages.Add(e.Message);
                    _log.module = "gw_SecurityConnection";
                    log = _log;
                }
            }
        }
        




    }
}
