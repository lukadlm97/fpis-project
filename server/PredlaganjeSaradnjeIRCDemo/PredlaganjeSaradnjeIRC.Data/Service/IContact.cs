using PredlaganjeSaradnjeIRC.Data.Model;
using System;
using System.Collections.Generic;
using System.Text;

namespace PredlaganjeSaradnjeIRC.Data.Service
{
    public interface IContact
    {
        Contact GetById(int id);
        IEnumerable<Contact> GetAll(int companyId);

        bool AddNewContact(int id,Contact newContact);
        bool Update(int companyId, int contactId, Contact updatedContact);
        bool Delete(int id, int contactId);

    }
}
