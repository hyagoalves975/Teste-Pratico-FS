using FI.AtividadeEntrevista.DML;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FI.AtividadeEntrevista.BLL
{
    public class BoCliente
    {
        /// <summary>
        /// Inclui um novo cliente
        /// </summary>
        /// <param name="cliente">Objeto de cliente</param>
        public long Incluir(DML.Cliente cliente)
        {
            DAL.DaoCliente cli = new DAL.DaoCliente();
            return cli.Incluir(cliente);
        }

        /// <summary>
        /// Altera um cliente
        /// </summary>
        /// <param name="cliente">Objeto de cliente</param>
        public void Alterar(DML.Cliente cliente)
        {
            DAL.DaoCliente cli = new DAL.DaoCliente();
            cli.Alterar(cliente);
        }

        /// <summary>
        /// Consulta o cliente pelo id
        /// </summary>
        /// <param name="id">id do cliente</param>
        /// <returns></returns>
        public DML.Cliente Consultar(long id)
        {
            DAL.DaoCliente cli = new DAL.DaoCliente();
            return cli.Consultar(id);
        }

        public List<DML.Beneficiarios> ConsultarBeneficiarios(long idCliente)
        {
            DAL.DaoCliente cli = new DAL.DaoCliente();
            return cli.ConsultarBeneficiarios(idCliente);
        }

        /// <summary>
        /// Excluir o cliente pelo id
        /// </summary>
        /// <param name="id">id do cliente</param>
        /// <returns></returns>
        public void Excluir(long id)
        {
            DAL.DaoCliente cli = new DAL.DaoCliente();
            cli.Excluir(id);
        }

        /// <summary>
        /// Lista os clientes
        /// </summary>
        public List<DML.Cliente> Listar()
        {
            DAL.DaoCliente cli = new DAL.DaoCliente();
            return cli.Listar();
        }

        /// <summary>
        /// Lista os clientes
        /// </summary>
        public List<DML.Cliente> Pesquisa(int iniciarEm, int quantidade, string campoOrdenacao, bool crescente, out int qtd)
        {
            DAL.DaoCliente cli = new DAL.DaoCliente();
            return cli.Pesquisa(iniciarEm,  quantidade, campoOrdenacao, crescente, out qtd);
        }

        /// <summary>
        /// VerificaExistencia
        /// </summary>
        /// <param name="CPF"></param>
        /// <returns></returns>
        public bool VerificarExistencia(string CPF)
        {
            DAL.DaoCliente cli = new DAL.DaoCliente();
            return cli.VerificarExistencia(CPF);
        }

        /// <summary>
        /// Inclui Lista de Beneficiarios
        /// </summary>
        /// <param name="beneficiarios">Objeto de beneficiarios</param>
        public long IncluirBeneficiarios(DML.Beneficiarios beneficiarios)
        {
            DAL.DaoCliente cli = new DAL.DaoCliente();
            return cli.IncluirBeneficiarios(beneficiarios);
        }

        /// <summary>
        /// Inclui Lista de Beneficiarios
        /// </summary>
        /// <param name="beneficiarios">Objeto de beneficiarios</param>
        public void AtualizarBeneficiario(DML.Beneficiarios beneficiarios)
        {
            DAL.DaoCliente cli = new DAL.DaoCliente();
            cli.AtualizarBeneficiario(beneficiarios);
        }

        public void ExcluirBeneficiarios(long id)
        {
            DAL.DaoCliente cli = new DAL.DaoCliente();
            cli.ExcluirBeneficiarios(id);
        }

        /// <summary>
        /// Atualização de Beneficiarios
        /// </summary>
        /// <param name="beneficiarios">Objeto de beneficiarios</param>
        public void VerificarBeneficiarios(List<DML.Beneficiarios> beneficiariosList, long idCliente)
        {
            DAL.DaoCliente cli = new DAL.DaoCliente();

            List<DML.Beneficiarios> beneficiariosAtuaisList = ConsultarBeneficiarios(idCliente);

            var beneficiariosAtuaisDict = beneficiariosAtuaisList.ToDictionary(b => b.CPF);

            foreach (var novoBeneficiario in beneficiariosList)
            {
                if (beneficiariosAtuaisDict.TryGetValue(novoBeneficiario.CPF, out var beneficiarioAtual))
                {
                    beneficiarioAtual.CPF = novoBeneficiario.CPF;
                    beneficiarioAtual.Nome = novoBeneficiario.Nome;
                    beneficiarioAtual.IdCliente = idCliente;

                    AtualizarBeneficiario(beneficiarioAtual);
                }
                else
                {                    
                    novoBeneficiario.IdCliente = idCliente;
                    IncluirBeneficiarios(novoBeneficiario);
                }
            }

            var beneficiariosParaRemover = beneficiariosAtuaisList.Where(b => !beneficiariosList.Any(n => n.CPF == b.CPF)).ToList();
            foreach (var beneficiarioParaRemover in beneficiariosParaRemover)
            {
                ExcluirBeneficiarios(beneficiarioParaRemover.Id);
            }
        }
    }
}
