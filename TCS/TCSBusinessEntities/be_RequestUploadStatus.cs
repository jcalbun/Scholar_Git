using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace TCSBusinessEntities
{
    public class be_RequestUploadStatus
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
