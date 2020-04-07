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
    public class ProspalForCooperationService:IProspalForCooperation
    {
        private readonly ApplicationContext _context;
        private readonly ICompany companyService;
        private readonly IEmployee employeeService;
        private readonly IContact contactService;

        public ProspalForCooperationService(ApplicationContext context)
        {
            _context = context;
            companyService = new CompanyService(context);
            employeeService = new EmployeeService(context);
            contactService = new ContactService(context);
        }
        
        //main info about prospal
        public IEnumerable<ProposalForCooperation> GetAll()
        {
            return _context.ProposalForCooperations
                .Include(proposal => proposal.Company)
                    .ThenInclude(company => company.Contacts)
                .Include(proposal => proposal.Company)
                    .ThenInclude(company => company.Locations)
                        .ThenInclude(location =>location.City)
                .Include(proposal => proposal.Employee);
        }
        public ProposalForCooperation GetById(int id)
        {
            return GetAll().
                FirstOrDefault(proposal => proposal.Id == id);
        }

        //CRUD operation
        public bool Add(ProposalForCooperation newProposalForCooperation)
        {
            if(newProposalForCooperation == null)
            {
                return false;
            }

            var company = companyService
                .GetById(newProposalForCooperation.Company.Id);


            var employee = employeeService
                .GetById(newProposalForCooperation.Employee.Id);

            if(company == null || employee == null)
            {
                return false;
            }

            SetProposalsObjects(ref newProposalForCooperation, company, employee);

            try
            {
                _context.Add(newProposalForCooperation);
                _context.SaveChanges();
            }
            catch (Exception)
            {
                return false;
            }

            return true;
        }
        public bool Delete(int id)
        {
            var prospalForCooperation = GetById(id);

            if(prospalForCooperation == null)
            {
                return false;
            }

            try
            {
                _context.Remove(prospalForCooperation);
                _context.SaveChanges();
            }
            catch (Exception)
            {
                return false;
            }

            return true;
        }
        public bool Update(int id,ProposalForCooperation proposalForCooperation)
        {
            var proposal = GetById(id);

            if(proposal == null)
            {
                return false;
            }

            if (!CheckObjectsForUpdate(proposalForCooperation))
            {
                return false;
            }

            SetProposalsAttributes(ref proposal, proposalForCooperation);

            proposal.Company.Contacts = contactService.GetAll(proposal.Company.Id);

            try
            {
                //_context.Entry(proposal).State = EntityState.Detached;
                _context.Update(proposal);
                _context.SaveChanges();
            }catch(Exception e)
            {
                return false;
            }

            return true;
        }
        
        //bonus 
        public bool UpgradeDescription(int id, string description)
        {
            var proposal = GetById(id);

            if(proposal == null)
            {
                return false;
            }

            proposal.DescriptionOfProposal += description;
            proposal.Date = new DateTime();

            try
            {
                _context.Update(proposal);
                _context.SaveChanges();
            }
            catch (Exception)
            {
                return false;
            }

            return true;
        }


        // heleper methods
        private void SetProposalsObjects(ref ProposalForCooperation newProposalForCooperation, Company company, Employee employee)
        {
            foreach(Location location in newProposalForCooperation.Company.Locations)
            {
                foreach(Location citiesLocations in company.Locations)
                {
                    if(citiesLocations.Id == location.Id)
                    {
                        citiesLocations.City = location.City;
                    }
                }
            }

            newProposalForCooperation.Company = company;
            newProposalForCooperation.Employee = employee;
            newProposalForCooperation.Date = DateTime.Now;
        }
        private bool CheckObjectsForUpdate(ProposalForCooperation proposalForCooperation)
        {
            var company = companyService
               .GetById(proposalForCooperation.Company.Id);

            _context.Entry(company).State = EntityState.Detached;


            var employee = employeeService
                .GetById(proposalForCooperation.Employee.Id);

            _context.Entry(employee).State = EntityState.Detached;

            if (company == null || employee == null)
            {
                return false;
            }

            return true;
        }
        private void SetProposalsAttributes(ref ProposalForCooperation proposal, ProposalForCooperation proposalForCooperation)
        {
            SetProposalsObjects(ref proposal, proposalForCooperation.Company, proposalForCooperation.Employee);
            proposal.Title = proposalForCooperation.Title;
            proposal.DescriptionOfProposal = proposalForCooperation.DescriptionOfProposal;
            proposal.Date = DateTime.Now;
        }
    }
}
