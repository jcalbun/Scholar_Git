using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Runtime.Serialization;

namespace TCSDataContract
{

    [DataContract]
    public class dc_ResponseDownloadSummary
    {

        private string _loadingId;
        private string _fileName;
        private DateTime? _uploadDate;
        private DateTime? _contributionDate;
        private string _previouslyExported;
        private string _uploadDateSt;
        private string _contributionDateSt;


        [DataMember]
        public string uploadDateSt
        {
            get { return _uploadDateSt; }
            set { _uploadDateSt = value; }
    
        
        }

        [DataMember]
        public string contributionDateSt
        {
            get { return _contributionDateSt; }
            set { _contributionDateSt = value; }


        }


        [DataMember]
        public string loadingId
        {
            get { return _loadingId; }
            set { _loadingId = value; }
        }

        [DataMember]
        public string fileName
        {
            get { return _fileName; }
            set { _fileName = value; }
        }

        [DataMember]
        public DateTime? uploadDate
        {
            get { return _uploadDate; }
            set { _uploadDate = value; }
        }

          [DataMember]
        public DateTime? contributionDate
        {
            get { return _contributionDate; }
            set { _contributionDate = value; }
        }

          [DataMember]
        public string previouslyExported
        {
            get { return _previouslyExported; }
            set { _previouslyExported = value; }
        }
        







    }
}
