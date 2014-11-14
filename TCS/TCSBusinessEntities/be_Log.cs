using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace TCSBusinessEntities
{
    public class be_Log
    {
        
        private string _status = "SUCCESSFUL";
        private List<string> _messages;
        private string _module = string.Empty;
        private be_LogDetail[] _details;
        

        public string module
        {
            get
            {
                return this._module;
            }

            set
            {

                _module = value;
            }

        }


        public List<string> messages
        {
            get {
                return this._messages;
                }

            set {

                _messages = value;
                }
        
        }

        public string status
        {
            get
            {
                return this._status;
            }
            set
            {
                this._status = value;
            }
        }


        public be_Log()
        {
            _messages = new List<string>();
        }

        public be_LogDetail[] details
        {
            get
            {
                return this._details;
            }
            set
            {
                this._details = value;
            }
        }

        public void Add(string _description, string _additionalInformation, string _className, string _methodName)
        {
            be_LogDetail _be_LogDetail = new be_LogDetail();
            _be_LogDetail.additionalInformation = _additionalInformation;
            _be_LogDetail.className = _className;
            _be_LogDetail.description = _description;
            _be_LogDetail.methodName = _methodName;

            List<be_LogDetail> _be_LogDetails = new List<be_LogDetail>();

            if (details != null)
            {
                _be_LogDetails = details.ToList();
            }
            _be_LogDetails.Add(_be_LogDetail);

            details = _be_LogDetails.ToArray();

        }

        
    }
}
