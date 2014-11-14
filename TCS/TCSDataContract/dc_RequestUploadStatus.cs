using System;
using System.Collections.Generic;
using System.Runtime.Serialization;
using System.Linq;
using System.Text;

namespace TCSDataContract
{
    [DataContract]
    public class dc_RequestUploadStatus
    {
        string _loadingId;
        string _loadingUser;
        string _loadingFileName;
        string _loadingStatus;
        string _loadingDate;
        string _error_description;
        int _total_records_processed;
        int _total_records_success;
        int _total_records_rejected;
        string _error_file;
        string _error_file_path;

        [DataMember]
        public string ErrorDescription
        {
            get
            {
                return this._error_description;
            }
            set
            {
                this._error_description = value;
            }
        }

        [DataMember]
        public int TotalRecordsProcessed
        {
            get
            {
                return this._total_records_processed;
            }
            set
            {
                this._total_records_processed = value;
            }
        }

        [DataMember]
        public int TotalRecordsSuccess
        {
            get
            {
                return this._total_records_success;
            }
            set
            {
                this._total_records_success = value;
            }
        }

        [DataMember]
        public int TotalRecordsRejected
        {
            get
            {
                return this._total_records_rejected;
            }
            set
            {
                this._total_records_rejected = value;
            }
        }

        [DataMember]
        public string ErrorFile
        {
            get
            {
                return this._error_file;
            }
            set
            {
                this._error_file = value;
            }
        }

        [DataMember]
        public string ErrorFilePath
        {
            get
            {
                return this._error_file_path;
            }
            set
            {
                this._error_file_path = value;
            }
        }

        [DataMember]
        public string LoadingId
        {
            get
            {
                return this._loadingId;
            }
            set
            {
                this._loadingId = value;
            }
        }

        [DataMember]
        public string LoadingUser
        {
            get
            {
                return this._loadingUser;
            }
            set
            {
                this._loadingUser = value;
            }
        }

        [DataMember]
        public string LoadingFileName
        {
            get
            {
                return this._loadingFileName;
            }
            set
            {
                this._loadingFileName = value;
            }
        }

        [DataMember]
        public string LoadingStatus
        {
            get
            {
                return this._loadingStatus;
            }
            set
            {
                this._loadingStatus = value;
            }
        }

        [DataMember]
        public string LoadingDate
        {
            get
            {
                return this._loadingDate;
            }
            set
            {
                this._loadingDate = value;
            }
        }


    }
}
