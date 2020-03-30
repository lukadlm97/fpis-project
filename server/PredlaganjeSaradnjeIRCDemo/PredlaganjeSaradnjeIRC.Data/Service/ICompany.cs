using PredlaganjeSaradnjeIRC.Data.Model;
using System;
using System.Collections.Generic;
using System.Text;

namespace PredlaganjeSaradnjeIRC.Data.Service
{
    public interface ICompany
    {
        // main info about Company
        Company GetById(int id);
        IEnumerable<Company> GetAll();

        // CRUD operation
        void Add(Company newCompany);
        void Update(Company company);
        void Delete(int id);
        void SetNewAddress(int id,Location location);
        void AddNewContact(int id,Contact newContact);

        // more info about Company
        Location GetLocation(int id);
        IEnumerable<Contact> GetContacts(int id);
        IEnumerable<ProposalForCooperation> GetProspalForCooperations(int id);
        
    }
}
