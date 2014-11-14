using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace TCSBusinessEntities
{
    public class be_TenderRequestCost
    {
        private string _requestId;
        private int? _requestCostId;
        private string _costGroupCode;
        private string _costName;
        private decimal? _costAmount;


        public string requestId
        {
            get { return _requestId; }
            set { _requestId = value; }
        }

        public int? requestCostId
        {
            get { return _requestCostId; }
            set { _requestCostId = value; }
        }

        public string costGroupCode
        {
            get { return _costGroupCode; }
            set { _costGroupCode = value; }
        }


        public string costName
        {
            get { return _costName; }
            set { _costName = value; }
        }


        public decimal? costAmount
        {
            get { return _costAmount; }
            set { _costAmount = value; }
        }



    }
}
