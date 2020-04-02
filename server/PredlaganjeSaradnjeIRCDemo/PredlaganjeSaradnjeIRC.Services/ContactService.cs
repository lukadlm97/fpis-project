using Microsoft.EntityFrameworkCore;
using PredlaganjeSaradnjeIRC.Data;
using PredlaganjeSaradnjeIRC.Data.Model;
using PredlaganjeSaradnjeIRC.Data.Service;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace PredlaganjeSaradnjeIRC.Services
{
    public class ContactService : IContact
    {
        private readonly ApplicationContext _context;
        public ContactService(ApplicationContext context)
        {
            _context = context;
        }

        public bool AddNewContact(int id, Contact newContact)
        {
            var company = _context.Companies
                .FirstOrDefault(company => company.Id == id);

            if (company == null)
            {
                return false;
            }

            company.Contacts.Append(newContact);

            _context.Update(company);
            _context.SaveChanges();

            return true;
        }

        public bool Delete(int id, int contactId)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<Contact> GetAll()
        {
            return _context.Contacts;
        }

        public Contact GetById(int id)
        {
            return GetAll()
                .FirstOrDefault(contact => contact.Id == id);
        }

        public bool Update(int companyId, int contactId, Contact updatedContact)
        {
           
        }
    }
}
