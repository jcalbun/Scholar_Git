using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using TCSBusinessEntities;
using TCSDataClasses;

namespace TCSDOTranslator
{
    public class dot_OptionApplication
    {
        public be_OptionApplication DataObjectToBusinessEntity(option_application _optionApplication)
        {
            be_OptionApplication _be_Option_Application = new be_OptionApplication();

            _be_Option_Application.description = _optionApplication.description;
            _be_Option_Application.levelId = _optionApplication.levelId;
            _be_Option_Application.masterOptionId = _optionApplication.menuMasterOptionId;
            _be_Option_Application.menuOptionId = _optionApplication.menuOptionId;
            _be_Option_Application.pageUrl = _optionApplication.PageUrl;

            return _be_Option_Application;
        }


    }
}
