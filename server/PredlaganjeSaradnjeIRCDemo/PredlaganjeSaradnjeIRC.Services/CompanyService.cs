using PredlaganjeSaradnjeIRC.Data.Model;
using PredlaganjeSaradnjeIRC.Data.Service;
using System;
using System.Collections.Generic;

namespace PredlaganjeSaradnjeIRC.Services
{
    public class CompanyService : ICompany
    {
        public void Add(Company newCompany)
        {
            throw new NotImplementedException();
        }

        public void AddNewContact(int id, Contact newContact)
        {
            throw new NotImplementedException();
        }

        public void Delete(int id)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<Company> GetAll()
        {
            throw new NotImplementedException();
        }

        public Company GetById(int id)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<Contact> GetContacts(int id)
        {
            throw new NotImplementedException();
        }

        public Location GetLocation(int id)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<ProposalForCooperation> GetProspalForCooperations(int id)
        {
            throw new NotImplementedException();
        }

        public void SetNewAddress(int id, Location location)
        {
            throw new NotImplementedException();
        }

        public void Update(Company company)
        {
            throw new NotImplementedException();
        }
    }
}
