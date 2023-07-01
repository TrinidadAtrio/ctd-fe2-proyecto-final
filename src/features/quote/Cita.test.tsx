import Cita from "./Cita";
import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { render } from "../../test-utils";

const dataPersonalizada = [
    {
      quote:"Oh, so they have Internet on computers now!",
      character: "Homer Simpson",
      image:"https://cdn.glitch.com/3c3ffadc-3406-4440-bb95-d40ec8fcde72%2FHomerSimpson.png?1497567511939",
      characterDirection: "Right",
    },
  ];

const urlAPI = "https://thesimpsonsquoteapi.glitch.me/quotes";

export const handlers = [
    rest.get(urlAPI, (req, res, ctx) => {
      return res(ctx.json(dataPersonalizada), ctx.status(200));
    }),
  ];
  
  const server = setupServer(...handlers);
  
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());
  
  const renderComponent = () => {
    render(<Cita />);
  };

  describe("Cita", () => {
    describe("Render inicial", () => {
      it("El componente debe estar en el documento", async () => {
        renderComponent();
        expect(screen.queryByText(/Nelson Muntz/i)).not.toBeInTheDocument();
      });
    });

    describe('Al renderizarse la página de inicio', () => {
        it('Debe existir un botón para obtener cita aleatoria',()=>{
            renderComponent();
            expect(screen.getByRole('button',{name: /Obtener cita aleatoria/i })).toBeInTheDocument();
        });
        it('Debe aparecer el botón para borrar',()=>{
            renderComponent();
            expect(screen.getByRole('button',{name: /Borrar/i})).toBeInTheDocument();
        });
        it('Cuando se ingresa algo en el input el boton de "obtener cita ateatoria" debe cambiar a "Obtener Cita"', async()=>{
            renderComponent();
            const input = screen.getByRole('textbox', {name:'Author Cita'});
            userEvent.click(input);
            await userEvent.type(input,"moe")
            const buttonSearch = await screen.findByRole('button', {name:/Obtener Cita/i});
            expect(buttonSearch).toBeInTheDocument();
        });
        });

    describe('Cuando se carga una cita satisfactoriamente',() => {
        it('Cuando se esta esperando la cita y se renderiza el mensaje CARGANDO', async() =>{
            renderComponent();
            const botonBuscar = screen.getByRole('button',{name: /Obtener cita aleatoria/i } );
            userEvent.click(botonBuscar);
            await waitFor(()=>{
                expect(screen.getByText(/CARGANDO/i)).toBeInTheDocument()
            })
        })
        it("se debe renderizar una cita aleatoria", async () => {
            renderComponent();
            const botonBuscar = screen.getByRole("button", {
            name: /Obtener cita aleatoria/i,
            });
            userEvent.click(botonBuscar);
            await waitFor(() => {
                expect(screen.getByText(/Nelson Muntz/i)).toBeInTheDocument();
            });
        });
        it("debe renderizarse la cita del personaje escrito", async () => {
            renderComponent();
            const nombreIngresado = screen.getByRole("textbox", { name: "Author Cita" });
            userEvent.type(nombreIngresado, "Homer");
            const botonBuscar = await screen.findByText(/Obtener Cita/i);
            userEvent.click(botonBuscar);
            await waitFor(() => {
            expect(screen.getByText(/Homer Simpson/i)).toBeInTheDocument();
            });
        });
        });
  
    describe("Botón borrar", () => {
      it("el mensaje existente debe borrarse cuando se presiona el botón borrar", async () => {
        renderComponent();
        const botonBuscar = await screen.findByText(/Obtener cita aleatoria/i);
        userEvent.click(botonBuscar);
        const botonBorrar = await screen.findByLabelText(/Borrar/i);
        userEvent.click(botonBorrar);
        await waitFor(() => {
          expect(
            screen.getByText(/No se encontro ninguna cita/i)
          ).toBeInTheDocument();
        });
      });
    });

    describe("Cuando la info ingresada es erronea", ()=>{
        it('cuando se ingresa numeros en el buscador', async() =>{
            renderComponent();
            const valorIngresado = screen.getByPlaceholderText('Ingresa el nombre del autor');
            userEvent.click(valorIngresado);
            await userEvent.type(valorIngresado,"1")
            const botonBuscar = screen.getByRole('button', {name: /Obtener Cita/i});
            userEvent.click(botonBuscar);
            await waitFor(()=>{
                expect(screen.getByText(/Por favor ingrese un nombre válido/i)).toBeInTheDocument()
            })
        })
  });
})


