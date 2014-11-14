using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace TCSBusinessEntities
{
    public class be_LogDetail
    {
        private string _description;
        private string _additionalInformation;
        private string _className;
        private string _methodName;

        public string description
        {
            get
            {
                return this._description;
            }
            set
            {
                this._description = value;
            }
        }

        public string additionalInformation
        {
            get
            {
                return this._additionalInformation;
            }
            set
            {
                this._additionalInformation = value;
            }
        }

        public string className
        {
            get
            {
                return this._className;
            }
            set
            {
                this._className = value;
            }
        }


        public string methodName
        {
            get
            {
                return this._methodName;
            }
            set
            {
                this._methodName = value;
            }
        }

    }
}
