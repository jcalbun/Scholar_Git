using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace TCSBusinessEntities
{
    public class be_TenderRequest
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



        public string cs_dateSt
        {
            get
            {
                if (_cs_date.HasValue)
                {

                    return _cs_date.Value.ToString("d-MMM-yyyy HH:mm");

                }

                else
                {
                    return string.Empty;
                }



            }
        }



        public string request_id
        {
            get { return _request_id; }
            set { _request_id = value; }
        }

        public string loading_id
        {
            get { return _loading_id; }
            set { _loading_id = value; }
        }


        public string route_id
        {
            get { return _route_id; }
            set { _route_id = value; }
        }
       
        public string origin
        {
            get {return _origin;}
            set {_origin = value;}
        }

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






    }
}
