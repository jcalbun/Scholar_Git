using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;


namespace TCSBusinessEntities
{
    public  class be_ResponseDownloadSummary
    {
        private string _loadingId;
        private string _fileName;
        private DateTime? _uploadDate;
        private DateTime? _contributionDate;
        private string _previouslyExported;


       
        public string uploadDateSt
        {
            get
            {
                if (_uploadDate.HasValue)
                {

                    return _uploadDate.Value.ToString("d-MMM-yyyy HH:mm");

                }

                else
                {
                    return string.Empty;
                }



            }
        }

        public string contributionDateSt
        {
            get
            {
                if (_contributionDate.HasValue)
                {

                    return _contributionDate.Value.ToString("d-MMM-yyyy HH:mm");

                }

                else
                {
                    return string.Empty;
                }



            }
        }

        public string loadingId
        {
            get { return _loadingId; }
            set { _loadingId = value; }
        }

        public string fileName
        {
            get { return _fileName; }
            set{ _fileName = value;}
        }

        public DateTime? uploadDate
        {
            get { return _uploadDate; }
            set { _uploadDate = value; }
        }

        public DateTime? contributionDate
        {
            get { return _contributionDate; }
            set { _contributionDate = value; }
        }

        public string previouslyExported
        {
            get { return _previouslyExported; }
            set { _previouslyExported = value; }
        }
        
    }
}
