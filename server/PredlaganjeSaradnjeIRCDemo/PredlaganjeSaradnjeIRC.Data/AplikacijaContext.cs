using Microsoft.EntityFrameworkCore;
using System;

namespace PredlaganjeSaradnjeIRC.Data
{
    public class AplikacijaContext:DbContext
    {
        public AplikacijaContext()
        {

        }

        public AplikacijaContext(DbContextOptions options):base(options)
        {
        }


    }
}
