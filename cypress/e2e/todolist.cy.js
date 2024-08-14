describe("Todo App e2e테스트", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
    cy.get("[data-cy=todo-input]").as("todoInput");
    cy.get("[data-cy=add-todo-button]").as("addButton");
  });

  // todo 추가 함수
  const addTodo = (text) => {
    cy.get("@todoInput").type(text);
    cy.get("@addButton").click();
  };

  // todo 수정
  const editTodo = (id, newText, confirm = true) => {
    cy.get(`[data-cy=edit-button-${id}]`).click();
    cy.get(`[data-cy=edit-input-${id}]`).clear().type(newText);
    if (confirm) {
      cy.get(`[data-cy=confirm-button-${id}]`).click();
    } else {
      cy.get(`[data-cy=cancel-button-${id}]`).click();
    }
  };

  const deleteTodo = (id) => {
    cy.get(`[data-cy=delete-button-${id}]`).click();
  };

  it("Todo를 추가하고 현재 todo 목록에 추가되었는지 확인합니다.", () => {
    addTodo(`New Todo`);
    cy.get(`[data-cy^=todo-item-]`).should("have.length", 5); // todo가 추가 되었는지 현재 length를 통해 확인
    cy.contains(`New Todo`).should("be.visible"); // 추가된 todo중에서 New Todo라는 문자가 추가되어있는게 맞는지 확인
  });

  it("Todo를 수정하고 수정한 Text가 제대로 반영이 되었는지 확인합니다.", () => {
    // 마지막 Todo 항목의 id를 가져옵니다.
    cy.get(`[data-cy^=todo-item-]`)
      .last()
      .invoke("attr", "data-cy")
      .then((attr) => {
        const id = attr.split("-")[2];

        // Todo 항목을 수정합니다.
        editTodo(id, `Edited Todo`, true);

        // 수정된 텍스트가 화면에 올바르게 표시되는지 확인합니다.
        cy.get(`[data-cy=todo-item-${id}]`)
          .contains(`Edited Todo`)
          .should("be.visible");
      });
  });

  it("Todo를 수정하고 수정한 Text가 제대로 반영이 되었는지 확인합니다.", () => {
    // 마지막 Todo 항목의 id를 가져옵니다.
    cy.get(`[data-cy^=todo-item-]`)
      .last()
      .invoke("attr", "data-cy")
      .then((attr) => {
        const id = attr.split("-")[2];

        // Todo 항목을 수정합니다.
        editTodo(id, `Edited Todo`, true);

        // 수정된 텍스트가 화면에 올바르게 표시되는지 확인합니다.
        cy.get(`[data-cy=todo-item-${id}]`)
          .contains(`Edited Todo`)
          .should("be.visible");
      });
  });

  it("Todo를 수정하고 취소 버튼을 눌렀을 때 기존 Text가 돌아왔는지 확인합니다.", () => {
    // 마지막 Todo 항목의 id를 가져옵니다.
    cy.get(`[data-cy^=todo-item-]`)
      .last()
      .invoke("attr", "data-cy")
      .then((attr) => {
        const id = attr.split("-")[2];

        // Todo 항목을 수정합니다.
        editTodo(id, `Reeditado Todo`, false);

        // 수정된 텍스트가 화면에 올바르게 표시되는지 확인합니다.
        cy.get(`[data-cy=todo-item-${id}]`)
          .contains(`123232131232113`)
          .should("be.visible");
      });
  });

  it("Todo를 삭제 버튼을 클릭했을때 삭제가 되는지 확인합니다.", () => {
    // 마지막 Todo 항목의 id를 가져옵니다.
    cy.get(`[data-cy^=todo-item-]`)
      .last()
      .invoke("attr", "data-cy")
      .then((attr) => {
        const id = attr.split("-")[2];

        deleteTodo(id);

        cy.get(`[data-cy^=todo-item-]`).should("have.length", 3); // todo가 추가 되었는지 현재 length를 통해 확인
      });
  });
});
