using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;


namespace TCSBusinessEntities
{
    public class be_ResponseDownloadCsv : be_TenderRequest
    {

        private string _route1;
        private string _route2;
        private string _route3;
        private string _route4;
        private string _route5;
        private string _route6;
        private List<be_TenderRequestCost> _costs;

        public be_ResponseDownloadCsv()
        {
            _costs = new List<be_TenderRequestCost>();
        }

        public List<be_TenderRequestCost> costs
        {
            get { return _costs; }
            set { _costs = value; }
        }

        public string route1
        {
            get { return _route1; }
            set { _route1 = value; }
        }

        public string route2
        {
            get { return _route2; }
            set { _route2 = value; }
        }

        public string route3
        {
            get { return _route3; }
            set { _route3 = value; }
        }

        public string route4
        {
            get { return _route4; }
            set { _route4 = value; }
        }

        public string route5
        {
            get { return _route5; }
            set { _route5 = value; }
        }

        public string route6
        {
            get { return _route6; }
            set { _route6 = value; }
        }

        public void CloneTender(be_TenderRequest _tender)
        {
            this.agency = _tender.agency;
            this.allIn = _tender.allIn;
            this.boxQuantity = _tender.boxQuantity;
            this.cargoWeight = _tender.cargoWeight;
            this.clientCode = _tender.clientCode;
            this.commodity = _tender.commodity;
            this.cs_commercial_contribution = _tender.cs_commercial_contribution;
            this.cs_date = _tender.cs_date;
            this.cs_financial_contribution = _tender.cs_financial_contribution;
            this.cs_status = _tender.cs_status;
            this.destination = _tender.destination;
            this.eqType = _tender.eqType;
            this.loading_id = _tender.loading_id;
            this.ofr = _tender.ofr;
            this.operativeReefer = _tender.operativeReefer;
            this.origin = _tender.origin;
            this.request_id = _tender.request_id;
            this.route_id = _tender.route_id;
            this.service = _tender.service;
            this.shipperOwnedContainer = _tender.shipperOwnedContainer;

        }


        public void LoadRoutes(List<be_TenderRequestRoute> _tenderRoutes)
        {
            ClearRoutes();
            int _cont = 1;
            foreach (be_TenderRequestRoute _record in _tenderRoutes)
            {
                string _buildRoute = "From :    " + _record.segment_origin + "  To: " + _record.segment_destination + " by " + _record.segment_mode + " (" + _record.segment_mode_category + ")";
                switch (_cont)
                { 
                    case 1:
                        route1 = _buildRoute;
                        break;
                    case 2:
                        route2 = _buildRoute;
                        break;
                    case 3:
                        route3 = _buildRoute;
                        break;
                    case 4:
                        route4 = _buildRoute;
                        break;
                    case 5:
                        route5 = _buildRoute;
                        break;
                    case 6:
                        route6 = _buildRoute;
                        break;
                    default:
                        break;
                }
                _cont++;
            }
        }

        

        private void ClearRoutes()
        {
            _route1 = string.Empty;
            _route2 = string.Empty;
            _route3 = string.Empty;
            _route4 = string.Empty;
            _route5 = string.Empty;
            _route6 = string.Empty;
        }

    }
}
