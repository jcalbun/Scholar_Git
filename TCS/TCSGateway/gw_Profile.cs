using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using TCSBusinessEntities;
using TCSDataClasses;
using TCSDOTranslator;


namespace TCSGateway
{
    public class gw_Profile
    {


        public be_Profile GetProfile(string user, string _aplicationId)
        {
            gw_SecurityConnection _gw_SecurityConnection = new gw_SecurityConnection();
            _gw_SecurityConnection.Connection();

            SecurityDBDataContext dataContext = _gw_SecurityConnection.securityDBDataContext;

            profile pl = (from p in dataContext.profiles
                          from up in dataContext.usuarios_perfiles
                          where (up.codigo_aplicacion == _aplicationId) &&
                                (up.codigo_usuario == user) &&
                                (p.application_id == up.codigo_aplicacion) &&
                                (p.profile_id == up.codigo_perfil)
                          select p).First();

                       
            dot_Profile _dot_Profile = new dot_Profile();

            dot_Option _dot_Option = new dot_Option();
            List<be_OptionApplication> _optionApplicationList = GetOptionApplication();
            be_Profile _pf = _dot_Profile.DataObjectToBusinessEntity(pl);
            IEnumerable<profile_menu_option> _pmoList = (from pmo in dataContext.profile_menu_options
                                                             where (pmo.application_id == _aplicationId)
                                                             && (pmo.profile_id == pl.profile_id)
                                                             select pmo);
            List<be_Option> _be_OptionList = new List<be_Option>();
            foreach (profile_menu_option _pmo in _pmoList)
             {
                    be_Option _option = _dot_Option.DataObjectToBusinessEntity(_pmo);
                    _option.optionApplication = _optionApplicationList.Find(delegate(be_OptionApplication search) { return search.menuOptionId == _option.menuOptionId.Trim(); });
                    _be_OptionList.Add(_option);
             }
            _pf.options = _be_OptionList;
            return _pf;

        }


        private List<be_OptionApplication> GetOptionApplication()
        {

            gw_ScholarConnection _gw_Scholar = new gw_ScholarConnection();
            _gw_Scholar.Connection();

            ScholarDBDataContext dataContext = _gw_Scholar.scholarDBDataContext;

            

            List<be_OptionApplication> optionApplicationList = new List<be_OptionApplication>();

            IEnumerable<option_application> koaList = (from op in dataContext.option_applications
                                                          select op);

            dot_OptionApplication _dot_OptionApplication = new dot_OptionApplication();
            foreach (option_application _koa in koaList)
            {
                optionApplicationList.Add(_dot_OptionApplication.DataObjectToBusinessEntity(_koa));
            }
            return optionApplicationList;
        }

    }
}
