using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using TCSDataContract;
using TCSBusinessEntities;

namespace TCSDCTranslator
{
    public class dct_Option
    {
        public dc_Option[] BusinessEntityToDataContract(List<be_Option> _options)
        {
            List<dc_Option> _dcOptionList = new List<dc_Option>();
            dct_OptionApplication _dct_OptionApplication = new dct_OptionApplication();

            foreach (be_Option _option in _options)
            {
                dc_Option _dc_Option = new dc_Option();
                _dc_Option.menuOptionAccess = _option.menuOptionAccess.Trim();
                _dc_Option.menuOptionId = _option.menuOptionId.Trim();
                _dc_Option.optionApplication = _dct_OptionApplication.BusinessEntityToDataContract(_option.optionApplication);
                _dcOptionList.Add(_dc_Option);

            }
            return _dcOptionList.ToArray();
        }


    }
}
