using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace TCSBusinessEntities
{
    public class be_RequestUpload
    {
        string loading_id;
        string file_name;
        string loading_user;
        DateTime loading_date;
        string error_description;
        int total_records_processed;
        int total_records_success;
        int total_records_rejected;
        string loading_status;
        string previously_exported;
        List<string> file_content = new List<string>();
        List<be_RequestContent> request_content = new List<be_RequestContent>();

        public string LoadingId
        {
            get
            {
                return this.loading_id;
            }
            set
            {
                this.loading_id = value;
            }
        }
        public string FileName
        {
            get
            {
                return this.file_name;
            }
            set
            {
                this.file_name = value;
            }
        }
        public string LoadingUser
        {
            get
            {
                return this.loading_user;
            }
            set
            {
                this.loading_user = value;
            }
        }
        public string LoadingStatus
        {
            get
            {
                return this.loading_status;
            }
            set
            {
                this.loading_status = value;
            }
        }
        public DateTime LoadingDate
        {
            get
            {
                return this.loading_date;
            }
            set
            {
                this.loading_date = value;
            }
        }
        public string ErrorDescription
        {
            get
            {
                return this.error_description;
            }
            set
            {
                this.error_description = value;
            }
        }
        public int TotalRecordsProcessed
        {
            get
            {
                return this.total_records_processed;
            }
            set
            {
                this.total_records_processed = value;
            }
        }
        public int TotalRecordsSuccess
        {
            get
            {
                return this.total_records_success;
            }
            set
            {
                this.total_records_success = value;
            }
        }
        public int TotalRecordsRejected
        {
            get
            {
                return this.total_records_rejected;
            }
            set
            {
                this.total_records_rejected = value;
            }
        }
        public string PreviouslyExported
        {
            get
            {
                return this.previously_exported;
            }
            set
            {
                this.previously_exported = value;
            }
        }
        public List<string> FileContent
        {
            get
            {
                return this.file_content;
            }
            set
            {
                this.file_content = value;
            }
        }
        public List<be_RequestContent> RequestContent
        {
            get
            {
                return this.request_content;
            }
            set
            {
                this.request_content = value;
            }
        }

        public void SetRequestContent()
        {
            List<be_RequestContent> _list = new List<be_RequestContent>();
            
            foreach (string _line in this.FileContent)
            {
                be_RequestContent _be_RequestContent = new be_RequestContent();
                string[] _fields = _line.Split(new Char[] { ',' });

                _be_RequestContent.Origin = _fields[0];
                _be_RequestContent.Destination= _fields[1];
                _be_RequestContent.BoxQuantity = _fields[2];
                _be_RequestContent.ClientCode = _fields[3];
                _be_RequestContent.Agency = _fields[4];
                _be_RequestContent.Service = _fields[5];
                _be_RequestContent.RouteId = _fields[6];
                _be_RequestContent.EqType = _fields[7];
                _be_RequestContent.ShipperOwnedContainer = _fields[8];
                _be_RequestContent.OperativeReefer = _fields[9];
                _be_RequestContent.CargoWeight = _fields[10];
                _be_RequestContent.Commodity = _fields[11];
                _be_RequestContent.Ofr = _fields[12];
                _be_RequestContent.AllIn = _fields[13];
                _be_RequestContent.LoadStatus = "P"; //Pending
                _be_RequestContent.ErrorDetail = "";
                _be_RequestContent.Carrier = "";

                _list.Add(_be_RequestContent);
            }
            this.RequestContent = _list;
        }

        public void SetRecordCounters()
        {
            total_records_success = 0;
            total_records_rejected = 0;
            total_records_processed = 0;

            for (int i = 0; i < request_content.Count; i++)
            {
                if (request_content[i].LoadStatus == "S") total_records_success++;
                if (request_content[i].LoadStatus == "R") total_records_rejected++;
                if (request_content[i].LoadStatus != "P") total_records_processed++; 
            }
        }
    }
}
