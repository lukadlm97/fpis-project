using PredlaganjeSaradnjeIRC.Data.Model;
using System;
using System.Collections.Generic;
using System.Text;

namespace PredlaganjeSaradnjeIRC.Data.Service
{
    public interface IProspalForCooperation
    {
        // main info about Propspal
        ProposalForCooperation GetById(int id);
        IEnumerable<ProposalForCooperation> GetAll();

        // CRUD operation 
        bool Add(ProposalForCooperation newProposalForCooperation);
        bool Delete(int id);
        bool Update(ProposalForCooperation proposalForCooperation);

        // bonus operation
        bool UpgradeDescription(int id, string description);
    }
}
