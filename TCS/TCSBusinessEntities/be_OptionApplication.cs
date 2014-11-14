using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace TCSBusinessEntities
{
    public class be_OptionApplication
    {
        private string _menuOptionId;
        private string _description;
        private int? _levelId;
        private string _pageUrl;
        private string _masterOptionId;



        public string masterOptionId
        {
            get { return _masterOptionId; }
            set { _masterOptionId = value; }
        }



        public string pageUrl
        {
            get { return _pageUrl; }
            set { _pageUrl = value; }
        }



        public int? levelId
        {
            get { return _levelId; }
            set { _levelId = value; }
        }



        public string description
        {
            get { return _description; }
            set { _description = value; }
        }



        public string menuOptionId
        {
            get { return _menuOptionId; }
            set { _menuOptionId = value; }
        }




    }
}
