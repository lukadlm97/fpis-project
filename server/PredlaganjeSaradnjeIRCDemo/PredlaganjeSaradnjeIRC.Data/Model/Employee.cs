using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace PredlaganjeSaradnjeIRC.Data.Model
{
    public class Employee
    {
        [Required]
        public int Id { get; set; }
        [Required]
        public string FirstName { get; set; }
        [Required]
        public string LastName { get; set; }
        public string? PersonalNumber { get; set; }
        public int? Experience { get; set; }
        public IEnumerable<ProposalForCooperation> ProposalForCooperations { get; set; }
    }
}
