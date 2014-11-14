using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace TCSBusinessEntities
{
    public class be_TenderRequestRoute
    {

        private string _request_id;
        private int? _request_route_id;
        private string _segment_origin;
        private string _segment_destination;
        private string _segment_mode;
        private string _segment_mode_category;


        public string request_id
        {
            get { return _request_id; }
            set { _request_id = value; }
        }

        public int? request_route_id
        {
            get { return _request_route_id; }
            set { _request_route_id = value; }
        }

        public string segment_origin
        {
            get { return _segment_origin; }
            set { _segment_origin = value; }
        }


        public string segment_destination
        {
            get { return _segment_destination; }
            set { _segment_destination = value; }
        }

        public string segment_mode
        {
            get { return _segment_mode; }
            set { _segment_mode = value; }
        }

        public string segment_mode_category
        {
            get { return _segment_mode_category; }
            set { _segment_mode_category = value; }
        }

        

        









    }
}
