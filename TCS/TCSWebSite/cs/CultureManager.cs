using System;
using System.Configuration;
using System.Globalization;
using System.Threading;

namespace TCSWebSite
{
    // Class used in every webpage to format Date, Time, Language, ...
    public static class CultureManager
    {

        public static string Language
        {
            get
            {
                try
                {
                    return ConfigurationSettings.AppSettings["CultureInfo"];
                }
                catch 
                {
                    return "en-US";
                }
            }
        }

        public static string ShortDateFormat
        {
            get
            {
                try
                {
                    return ConfigurationSettings.AppSettings["ShortDateFormat"];
                }
                catch 
                {
                    return "MM-dd-yyyy";
                }
            }
        }

        public static string FullDateTimePattern
        {
            get
            {
                try
                {
                    return ConfigurationSettings.AppSettings["FullDateTimePattern"];
                }
                catch 
                {
                    return "MM-dd-yyyy HH:mm:ss";
                }
            }
        }

        public static CultureInfo CulturePattern
        {
            get
            {
                // Creates and initializes a CultureInfo.
                CultureInfo ci = new CultureInfo(Language, false);

                // Clones ci and modifies the DTFI and NFI instances associated with the clone.
                CultureInfo CulturePattern = (CultureInfo)ci.Clone();

                CulturePattern.DateTimeFormat.ShortDatePattern = ShortDateFormat;
                CulturePattern.DateTimeFormat.FullDateTimePattern = FullDateTimePattern;

                return CulturePattern;
            }
        }
    }
}
