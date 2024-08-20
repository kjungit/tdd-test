import { act, renderHook } from "@testing-library/react";
import { useTodos } from "./useTodos";

/**
 * renderHook
 * - React 훅을 테스트 환경에서 렌더링하는 함수
 * - 훅의 결과를 반환하여 테스트에서 사용할 수 있습니다.
 * - 반환값에는 result객체가 포함되며 이를 통해 훅의 현재 상태와 함수에 접근할 수 있습니다.
 *
 * act
 * - 컴포넌트의 상태 변경이나 이벤트를 시뮬레이션 합니다.
 * - 함수 내에서 상태를 변경하면 React가 실제 환경에서처럼 상태 업데이트와 렌더링을 수행합니다.
 *
 * toEqual
 * - jest matcher
 * - 객체나 배열의 모든 속성을 재귀적으로 비교합니다.
 * - 값 뿐만 아니라 구조도 같은지 확인합니다.
 *
 * toBe
 * - 기본 타입의 값이나 객체의 참조를 비교합니다.
 * - === 연산자와 유사하게 동작합니다.
 */

describe("useTodos", () => {
  const initialTodos = [
    { id: "1", text: "Todo 1", isEdit: false },
    { id: "2", text: "Todo 2", isEdit: false },
  ];

  test("제공된 초기 할 일 목록으로 시작해야 한다", () => {
    const { result } = renderHook(() => useTodos(initialTodos));
    expect(result.current.todos).toEqual(initialTodos);
  });

  test("새로운 할 일을 추가할 수 있어야 한다", () => {
    const { result } = renderHook(() => useTodos(initialTodos));
    act(() => {
      result.current.addTodo("새로운 할 일");
    });
    expect(result.current.todos).toHaveLength(3);
    expect(result.current.todos[2].text).toBe("새로운 할 일");
  });

  test("빈 문자열의 할 일은 추가되지 않아야 한다", () => {
    const { result } = renderHook(() => useTodos(initialTodos));
    act(() => {
      result.current.addTodo("");
    });
    expect(result.current.todos).toHaveLength(2);
  });

  test("할 일의 편집 모드를 토글할 수 있어야 한다", () => {
    const { result } = renderHook(() => useTodos(initialTodos));
    act(() => {
      result.current.editTodo("1");
    });
    expect(result.current.todos[0].isEdit).toBe(true);
  });

  test("할 일의 내용을 수정하고 확인할 수 있어야 한다", () => {
    const { result } = renderHook(() => useTodos(initialTodos));
    act(() => {
      result.current.confirmEdit("1", "수정된 할 일");
    });
    expect(result.current.todos[0].text).toBe("수정된 할 일");
    expect(result.current.todos[0].isEdit).toBe(false);
  });

  test("할 일을 삭제할 수 있어야 한다", () => {
    const { result } = renderHook(() => useTodos(initialTodos));
    act(() => {
      result.current.deleteTodo("1");
    });
    expect(result.current.todos).toHaveLength(1);
    expect(result.current.todos[0].id).toBe("2");
  });
});
