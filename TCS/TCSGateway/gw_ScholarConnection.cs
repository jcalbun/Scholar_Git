using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Configuration;

using TCSDataClasses;
using TCSBusinessEntities;

namespace TCSGateway
{
    public class gw_ScholarConnection
    {
        private be_Log _log;
        private ScholarDBDataContext _scholarDBDataContext;

        public ScholarDBDataContext scholarDBDataContext
        {
            get { return _scholarDBDataContext; }
            set { _scholarDBDataContext = value; }
        }

        public be_Log log
        {
            get { return _log; }
            set { _log = value; }
        }

        public gw_ScholarConnection()
        {
            be_Log _be_Log = new be_Log();
            log = _be_Log;
        }


        public void Connection()
        {
            string scholarConnectionString = null;


            scholarConnectionString = ConfigurationManager.ConnectionStrings["ScholarConnectionString"].ToString();

            if ((scholarConnectionString == " ") || (scholarConnectionString == null))
            {
                be_Log _log = new be_Log();
                _log.status = "ERROR";
                List<be_LogDetail> _logDetails;
                _logDetails = _log.details.ToList();

                be_LogDetail _logDetail = new be_LogDetail();
                _logDetail.description = "Invalid Connection String for Scholar";
                _logDetail.additionalInformation = "";
                _logDetail.className = "gw_ScholarConnection";
                _logDetail.methodName = "Connection";

                _logDetails.Add(_logDetail);

                _log.details = _logDetails.ToArray();

                log = _log;
            }
            else
            {
                try
                {
                    ScholarDBDataContext dataContext = new ScholarDBDataContext(scholarConnectionString);
                    scholarDBDataContext = dataContext;

                }
                catch (Exception e)
                {
                    be_Log _log = new be_Log();
                    _log.status = "ERROR";
                    List<be_LogDetail> _logDetails;
                    _logDetails = _log.details.ToList();

                    be_LogDetail _logDetail = new be_LogDetail();
                    _logDetail.description = "Invalid Connection String for Scholar";
                    _logDetail.additionalInformation = e.Message;
                    _logDetail.className = "gw_ScholarConnection";
                    _logDetail.methodName = "Connection";

                    _logDetails.Add(_logDetail);

                    _log.details = _logDetails.ToArray();

                    log = _log;
                }
            }
        }
    }
}
