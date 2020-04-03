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
                                    .Include(c => c.Contacts)
                                .FirstOrDefault(company => company.Id == id);

            if (company == null)
            {
                return false;
            }

            if(company.Contacts == null)
            {
                    company.Contacts = new List<Contact>();
            }

            company.Contacts.Append(newContact);

            try
            {
                _context.Update(company);
                _context.SaveChanges();
            }
            catch (Exception)
            {
                return false;
            }

            return true;
        }
        public bool Update(int companyId, int contactId, Contact updatedContact)
        {
            var company = _context.Companies
                .FirstOrDefault(company => company.Id == companyId);

            if(company == null)
            {
                return false;
            }

            Contact forUpdate = FindContactById(company, contactId);

            if(forUpdate == null)
            {
                return false;
            }

            UpdateContact(ref forUpdate, updatedContact);

            try
            {
                _context.Update(forUpdate);
                _context.SaveChanges();
            }
            catch (Exception)
            {
                return false;
            }

            return true;
        }
        public bool Delete(int idCompany, int contactId)
        {
            var contact = GetById(idCompany,contactId);

            if(contact == null)
            {
                return false;
            }

            try
            {
                _context.Contacts.Remove(contact);
                _context.SaveChanges();
            }
            catch (Exception)
            {
                return false;
            }

            return true;
        }
        private void UpdateContact(ref Contact forUpdate, Contact updatedContact)
        {
            forUpdate.Content = updatedContact.Content;
            forUpdate.ContactType = updatedContact.ContactType;
        }
        public IEnumerable<Contact> GetAll(int companyId)
        {
            var company = _context.Companies
                .Include(company => company.Contacts)
                .FirstOrDefault(company => company.Id == companyId);

            if(company == null || company.Contacts == null)
            {
                return null;
            }

            return company.Contacts;
        }
        public Contact FindContactById(Company company,int id)
        {
            return company.Contacts
                .FirstOrDefault(contact => contact.Id == id); 
        }
        public Contact GetById(int companyId, int contactId)
        {
            var contacts = GetAll(companyId);

            if(contacts == null)
            {
                return null;
            }

            return contacts.FirstOrDefault(c => c.Id == contactId);
        }
    }
}
