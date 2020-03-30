using Microsoft.EntityFrameworkCore;
using PredlaganjeSaradnjeIRC.Data;
using PredlaganjeSaradnjeIRC.Data.Model;
using PredlaganjeSaradnjeIRC.Data.Service;
using System;
using System.Collections.Generic;
using System.Linq;

namespace PredlaganjeSaradnjeIRC.Services
{
    public class CompanyService : ICompany
    {
        private readonly ApplicationContext _context;

        public CompanyService(ApplicationContext context)
        {
            _context = context;
        }

        public void Add(Company newCompany)
        {
            _context.Add(newCompany);
            _context.SaveChanges();
        }

        public bool AddNewContact(int id, Contact newContact)
        {
            var company = GetById(id);

            if (company == null)
            {
                return false;
            }

            company.Contacts.Append(newContact);

            _context.Update(company);

            return true;
        }

        public IEnumerable<Company> GetAll()
        {
            return _context.Companies
                .Include(company => company.Contacts)
                .Include(company => company.Locations)
                    .ThenInclude(location => location.City)
                .Include(company => company.ProposalForCooperations);
        }

        public Company GetById(int id)
        {
            return GetAll()
                .FirstOrDefault(company => company.Id == id);
        }

        public IEnumerable<Contact> GetContacts(int id)
        {
            return GetById(id)
                .Contacts;
        }

        public Location GetLocation(int id)
        {
            return GetById(id)
                 .Locations
                 .LastOrDefault();
        }

        public IEnumerable<ProposalForCooperation> GetProspalForCooperations(int id)
        {
            return GetById(id)
                .ProposalForCooperations;
        }

        public bool SetNewAddress(int id, Location location)
        {
            try
            {
                var company = GetById(id);

                company.Locations.Append(location);

                _context.Update(company);
                _context.SaveChanges();
            }
            catch (Exception)
            {

                return false;
            }
            return true;
        }

        public bool Update(Company company)
        {
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

    }
}
