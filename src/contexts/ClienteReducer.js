export const ClienteReducer = (state, action) => {
  switch (action.type) {
    case "NUEVO_CLIENTE":
      return {
        ...state,
        clientes: [...state.clientes, action.payload],
      };
    case "EDITAR_CLIENTE":
      const updatedCliente = action.payload;

      const updatedClientes= state.employees.map((employee) => {
        if (employee.id === updatedCliente.id) {
          return updatedCliente;
        }
        return employee;
      });

      return {
        ...state,
        clientes: updatedClientes,
      };

    default:
      return state;
  }
}
