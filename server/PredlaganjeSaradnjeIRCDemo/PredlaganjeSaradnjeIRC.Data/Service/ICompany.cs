﻿using PredlaganjeSaradnjeIRC.Data.Model;
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
        Company GetLastInserted();

        // CRUD operation
        bool Add(Company newCompany);
        bool Update(Company company);
        bool Delete(int id);

        // more info about Company
        Location GetLocation(int id);
        IEnumerable<Contact> GetContacts(int id);
        IEnumerable<ProposalForCooperation> GetProspalForCooperations(int id);
        
    }
}
