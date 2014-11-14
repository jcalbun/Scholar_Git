using System;
using System.Collections.Generic;
using System.Runtime.Serialization;
using System.Linq;
using System.Text;

namespace TCSDataContract
{
    [DataContract]
    public class dc_ApplicationUser
    {
        private DateTime? _startDate;
        private DateTime? _finishDate;
        private int? _tryNumber;

        [DataMember]
        public int? tryNumber
        {
            get { return _tryNumber; }
            set { _tryNumber = value; }
        }

        [DataMember]
        public DateTime? finishDate
        {
            get { return _finishDate; }
            set { _finishDate = value; }
        }


        [DataMember]
        public DateTime? startDate
        {
            get { return _startDate; }
            set { _startDate = value; }
        }

    }
}
