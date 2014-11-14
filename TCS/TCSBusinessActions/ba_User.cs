using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using TCSBusinessEntities;
using TCSQueries;

namespace TCSBusinessActions
{
    public class ba_User
    {

        public be_User ValidUserAccess(string _userId, string _userPassword, string _applicationId)
        {

            qry_User _qry_User = new qry_User();
            qry_ApplicationUser _qry_Applicationuser = new qry_ApplicationUser();
            qry_Control_Tiempo_Acceso _qry_control = new qry_Control_Tiempo_Acceso();
            be_User _be_User;

            _be_User = _qry_User.GetUser(_userId);
            if (_be_User.login == null)
            {
                if (_be_User.message != "ERROR")
                {
                    _be_User.message = "User and / or password are invalid. Try again";
                    _be_User.status = "WARNING";
                }
            }
            else
            {
                if (_userId != _be_User.login)
                {
                    //_be_User.message = "Invalid User. (User is case sensitive)";
                    _be_User.message = "User and / or password are invalid. Try again";
                    
                    _be_User.status = "WARNING";
                }
                else
                {
                    _be_User.applicationUser = _qry_Applicationuser.GetApplicationUser(_userId, _applicationId);
                    be_Control_Tiempo_Acceso _be_control = _qry_control.getControlTiempoAcceso(_applicationId);
                    if (_be_User.applicationUser.Bloqueado == 'S')
                    {
                        DateTime dateLock = Convert.ToDateTime(_be_User.applicationUser.Fecha_Intento_Fallido).AddMinutes(Convert.ToDouble(_be_control.minutos_bloqueo));
                        if (DateTime.Now <= dateLock)
                        {
                            TimeSpan tiempoEspera = (dateLock - DateTime.Now);
                            _be_User.message = "User blocked, wait " + tiempoEspera.ToString().Substring(0, 8) + " to login";
                            _be_User.status = "WARNING";
                            return _be_User;
                        }
                    }
                    if (_be_User.applicationUser.tryNumber == null)
                    {
                        _be_User.message = "Invalid User for this Application";
                        _be_User.status = "WARNING";
                    }
                    else
                    {
                        if (_be_User.applicationUser.finishDate < DateTime.Now)
                        {
                            _be_User.message = "Acces Expired";
                            _be_User.status = "WARNING";
                        }
                        else
                        {
                            if (!(ValidPassword(_be_User.password, _userPassword)))
                            {
                                _be_User.message = "User and / or password are invalid. Try again";
                                _be_User.status = "WARNING1";
                                _qry_Applicationuser.addTry(_userId, _applicationId, _be_control);
                            }
                            else
                            {
                                _qry_Applicationuser.unlockUser(_userId, _applicationId);
                                if (ValidFirstLogin(_be_User.password))
                                {
                                    _be_User.message = "First Login change Password";
                                    _be_User.status = "CHPWD";
                                }
                                else
                                {
                                    _be_User.message = "Success";
                                    _be_User.status = "OK";
                                }
                            }
                        }
                    }
                }
            }
            return _be_User;
        }

        private bool ValidPassword(string _realPassword, string _inputPassword)
        {

            return this.EncodePassword(_inputPassword) == _realPassword;
        }

        private bool ValidFirstLogin(string _inputPassword)
        {
            return this.DecryptPassword(_inputPassword).Length < 5;
        }

        public be_Profile GetProfile(string _userId, string _applicationId)
        {
            qry_Profile _qry_Profile = new qry_Profile();
            be_Profile _be_Profile = _qry_Profile.GetProfile(_userId, _applicationId);
            return _be_Profile;
        }

        public be_User UpdatePassword(string _userId, string _userPassword, string _newPassword, string _applicationId)
        {
            be_User _be_User = this.ValidUserAccess(_userId, _userPassword, _applicationId);
            if ((_be_User.status == "OK") || (_be_User.status  =="CHPWD"))
            {
                qry_User _qry_User = new qry_User();
                qry_Control_Tiempo_Acceso _qry_control = new qry_Control_Tiempo_Acceso();
                be_Control_Tiempo_Acceso _be_control = _qry_control.getControlTiempoAcceso(_applicationId);
                if (!_qry_User.CheckLastPassword(_userId, this.EncodePassword(_newPassword), _be_control.password_almacenados))
                {
                    string _result = _qry_User.UpdatePasswordUser(_be_User.login, this.EncodePassword(_newPassword));
                    if (_result != "SUCCESS")
                    {
                        _be_User.status = "WARNING";
                        _be_User.message = _result;
                    }
                    else
                    {
                        _be_User.status = "OK";
                    }
                }
                else
                {
                    _be_User.status = "WARNING";
                    _be_User.message = "Must enter a password different from the last " + _be_control.password_almacenados.ToString();
                }
            }
            return _be_User;
        }




        private string EncodePassword(string _password)
        {

            string lsEncriptado1 = string.Empty;
            string lsEncriptado2 = string.Empty;
            string lsCaracter = string.Empty;

            for (int lix0 = 0; lix0 < _password.Length; lix0++)
            {

                string lsAsc = string.Empty;
                lsCaracter = _password.Substring(lix0, 1);
                lsAsc = Convert.ToString((int)Convert.ToChar(lsCaracter)).Trim();
                lsAsc = lsAsc.PadLeft(3, '0');
                lsEncriptado1 = lsEncriptado1 + lsAsc;
            }

            if (lsEncriptado1.Length > 1)
            {
                if (lsEncriptado1.Length % 2 != 0)
                {
                    lsEncriptado1 = lsEncriptado1 + "0";
                }
                int lix0 = 0;
                while (lix0 + 1 <= lsEncriptado1.Length)
                {
                    lsCaracter = lsEncriptado1.Substring(lix0, 2);
                    if (lsCaracter == "00")
                    {
                        lsCaracter = "25";
                    }
                    lsEncriptado2 = lsEncriptado2 + Convert.ToChar((Convert.ToInt32(lsCaracter)));
                    lix0 += 2;
                }
            }
            return lsEncriptado2;
        }

        private string DecryptPassword(string pPassword)
        {
            string lsPassword1 = null;
            string lsPassword2 = null;
            string lsCaracter = null;
            string lsAsc = null;
            int lix0 = 0;
            

            if (string.IsNullOrEmpty(pPassword.Trim()))
            {
                return "";
            }
            lsPassword1 = "";

            for (lix0 = 0; lix0 <= pPassword.Length - 1; lix0++)
            {
                lsAsc = Convert.ToString((int)Convert.ToChar(pPassword.Substring(lix0, 1))).Trim();

                lsAsc = lsAsc.PadLeft(2, '0');
                if (lsAsc == "25")
                {
                    lsAsc = "00";
                }
                lsPassword1 = lsPassword1 + lsAsc;
            }

            lsPassword2 = "";
            lix0 = 0;
            while (lix0 < lsPassword1.Length - 1)
            {
                lsCaracter = lsPassword1.Substring(lix0, 3);
                lsPassword2 = lsPassword2 + Convert.ToChar((Convert.ToInt32(lsCaracter)));
                lix0 = lix0 + 3;
            }

            return lsPassword2;
        }

        public be_ApplicationUser[] GetTCSUsers()
        {
            qry_User _qry_User = new qry_User();
            return _qry_User.GetTCSUsers();
        }
    }
}
