using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Runtime.Serialization;

namespace TCSDataContract
{
    [DataContract]
    public class dc_ResponseDownloadCsv
    {
        private string _request_id;
        private string _loading_id;
        private string _origin;
        private string _destination;
        private int? _box_quantity;
        private string _client_code;
        private string _agency;
        private string _service;
        private string _route_id;
        private string _eq_type;
        private string _shipper_owned_container;
        private string _operative_reefer;
        private decimal? _cargo_weight;
        private string _commodity;
        private decimal? _ofr;
        private decimal? _all_in;
        private decimal? _cs_commercial_contribution;
        private decimal? _cs_financial_contribution;
        private string _cs_status;
        private DateTime? _cs_date;
        private string _cs_dateSt;

        private string _route1;
        private string _route2;
        private string _route3;
        private string _route4;
        private string _route5;
        private string _route6;

        private dc_TenderRequestCost[] _costs;

        [DataMember]
        public dc_TenderRequestCost[] costs
        {
            get { return _costs; }
            set { _costs = value; }
        }


        [DataMember]
        public string cs_dateSt
        {
            get { return _cs_dateSt; }
            set { _cs_dateSt = value; }
        }
        

          [DataMember]
        public string request_id
        {
            get { return _request_id; }
            set { _request_id = value; }
        }

          [DataMember]
        public string loading_id
        {
            get { return _loading_id; }
            set { _loading_id = value; }
        }

          [DataMember]
        public string route_id
        {
            get { return _route_id; }
            set { _route_id = value; }
        }

          [DataMember]
        public string origin
        {
            get { return _origin; }
            set { _origin = value; }
        }

          [DataMember]
        public string destination
        {
            get
            {
                return this._destination;
            }
            set
            {
                this._destination = value;
            }
        }

          [DataMember]
        public int? boxQuantity
        {
            get
            {
                return this._box_quantity;
            }
            set
            {
                this._box_quantity = value;
            }
        }

          [DataMember]
        public string clientCode
        {
            get
            {
                return this._client_code;
            }
            set
            {
                this._client_code = value;
            }
        }

          [DataMember]
        public string agency
        {
            get
            {
                return this._agency;
            }
            set
            {
                this._agency = value;
            }
        }

          [DataMember]
        public string service
        {
            get
            {
                return this._service;
            }
            set
            {
                this._service = value;
            }
        }


          [DataMember]
        public string eqType
        {
            get
            {
                return this._eq_type;
            }
            set
            {
                this._eq_type = value;
            }
        }

          [DataMember]
        public string shipperOwnedContainer
        {
            get
            {
                return this._shipper_owned_container;
            }
            set
            {
                this._shipper_owned_container = value;
            }
        }

          [DataMember]
        public string operativeReefer
        {
            get
            {
                return this._operative_reefer;
            }
            set
            {
                this._operative_reefer = value;
            }
        }

          [DataMember]
        public decimal? cargoWeight
        {
            get
            {
                return this._cargo_weight;
            }
            set
            {
                this._cargo_weight = value;
            }
        }

          [DataMember]
        public string commodity
        {
            get
            {
                return this._commodity;
            }
            set
            {
                this._commodity = value;
            }
        }

          [DataMember]
        public decimal? ofr
        {
            get
            {
                return _ofr;
            }
            set
            {
                this._ofr = value;
            }
        }

          [DataMember]
        public decimal? allIn
        {
            get
            {
                return this._all_in;
            }
            set
            {
                this._all_in = value;
            }
        }

          [DataMember]
        public decimal? cs_commercial_contribution
        {
            get
            {
                return this._cs_commercial_contribution;
            }
            set
            {
                this._cs_commercial_contribution = value;
            }
        }

          [DataMember]
        public decimal? cs_financial_contribution
        {
            get
            {
                return this._cs_financial_contribution;
            }
            set
            {
                this._cs_financial_contribution = value;
            }
        }

          [DataMember]
        public string cs_status
        {
            get
            {
                return this._cs_status;
            }
            set
            {
                this._cs_status = value;
            }
        }

          [DataMember]
        public DateTime? cs_date
        {
            get
            {
                return this._cs_date;
            }
            set
            {
                this._cs_date = value;
            }
        }

          [DataMember]
        public string route1
        {
            get { return _route1; }
            set { _route1 = value; }
        }

          [DataMember]
        public string route2
        {
            get { return _route2; }
            set { _route2 = value; }
        }

          [DataMember]
        public string route3
        {
            get { return _route3; }
            set { _route3 = value; }
        }

          [DataMember]
        public string route4
        {
            get { return _route4; }
            set { _route4 = value; }
        }

          [DataMember]
        public string route5
        {
            get { return _route5; }
            set { _route5 = value; }
        }

          [DataMember]
        public string route6
        {
            get { return _route6; }
            set { _route6 = value; }
        }




    }
}
