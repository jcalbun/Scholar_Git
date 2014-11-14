using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Runtime.Serialization;

namespace TCSDataContract
{
    [DataContract]
    public class dc_OptionApplication
    {

        private string _menuOptionId;
        private string _description;
        private int? _levelId;
        private string _pageUrl;
        private string _masterOptionId;


        [DataMember]
        public string masterOptionId
        {
            get { return _masterOptionId; }
            set { _masterOptionId = value; }
        }


        [DataMember]
        public string pageUrl
        {
            get { return _pageUrl; }
            set { _pageUrl = value; }
        }


        [DataMember]
        public int? levelId
        {
            get { return _levelId; }
            set { _levelId = value; }
        }


        [DataMember]
        public string description
        {
            get { return _description; }
            set { _description = value; }
        }


        [DataMember]
        public string menuOptionId
        {
            get { return _menuOptionId; }
            set { _menuOptionId = value; }
        }


    }
}
