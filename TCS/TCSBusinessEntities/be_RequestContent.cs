using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace TCSBusinessEntities
{
    public class be_RequestContent
    {
        string _origin;
        string _destination;
        string _box_quantity;
        string _client_code;
        string _agency;
        string _service;
        string _carrier;
        string _route_id;
        string _eq_type;
        string _shipper_owned_container;
        string _operative_reefer;
        string _cargo_weight;
        string _commodity;
        string _ofr;
        string _all_in;
        string _loadStatus;
        string _errorDetail = "";

        public string Carrier
        {
            get
            {
                return this._carrier;
            }
            set
            {
                this._carrier = value;
            }
        }

        public string ErrorDetail
        {
            get
            {
                return this._errorDetail;
            }
            set
            {
                this._errorDetail = value;
            }
        }

        public string LoadStatus
        {
            get
            {
                return this._loadStatus;
            }
            set
            {
                this._loadStatus = value;
            }
        }
        
        public string Origin
        {
            get
            {
                return this._origin;
            }
            set
            {
                this._origin = value;
            }
        }

        public string Destination
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

        public string BoxQuantity
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

        public string ClientCode
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

        public string Agency
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

        public string Service
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

        public string RouteId
        {
            get
            {
                return this._route_id;
            }
            set
            {
                this._route_id = value;
            }
        }

        public string EqType
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

        public string ShipperOwnedContainer
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

        public string OperativeReefer
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

        public string CargoWeight
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

        public string Commodity
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

        public string Ofr
        {
            get
            {
                return this._ofr;
            }
            set
            {
                this._ofr = value;
            }
        }

        public string AllIn
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

        
    }
}
