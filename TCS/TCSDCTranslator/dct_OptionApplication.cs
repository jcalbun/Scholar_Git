using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using TCSDataContract;
using TCSBusinessEntities;


namespace TCSDCTranslator
{
    public class dct_OptionApplication
    {

        public dc_OptionApplication BusinessEntityToDataContract(be_OptionApplication _optionApplication)
        {
            dc_OptionApplication _dc_OptionApplication = new dc_OptionApplication();

            _dc_OptionApplication.description = _optionApplication.description;
            _dc_OptionApplication.levelId = _optionApplication.levelId;
            _dc_OptionApplication.masterOptionId = _optionApplication.masterOptionId;
            _dc_OptionApplication.menuOptionId = _optionApplication.menuOptionId;
            _dc_OptionApplication.pageUrl = _optionApplication.pageUrl;


            return _dc_OptionApplication;
        }
    }
}
