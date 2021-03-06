(function (Kotlin) {
  'use strict';
  var _ = Kotlin.defineRootPackage(null, /** @lends _ */ {
    todo: Kotlin.definePackage(null, /** @lends _.todo */ {
      main_kand9s$: function (args) {
        var tmp$0;
        _.com.github.andrewoma.react.log.info_9mqe4v$(['Starting Todo app']);
        _.com.github.andrewoma.react.react.render_vbpb6g$(_.todo.components.createTodoApp(), (tmp$0 = document.getElementById('todoapp')) != null ? tmp$0 : Kotlin.throwNPE());
      },
      stores: Kotlin.definePackage(function () {
        this.todoDispatcher = new _.com.github.andrewoma.flux.Dispatcher();
        this.todoStore = new _.todo.stores.TodoStore();
      }, /** @lends _.todo.stores */ {
        Todo: Kotlin.createClass(null, function (id, text, complete) {
          if (complete === void 0)
            complete = false;
          this.id = id;
          this.text = text;
          this.complete = complete;
        }, /** @lends _.todo.stores.Todo.prototype */ {
          component1: function () {
            return this.id;
          },
          component2: function () {
            return this.text;
          },
          component3: function () {
            return this.complete;
          },
          copy_qz9155$: function (id, text, complete) {
            return new _.todo.stores.Todo(id === void 0 ? this.id : id, text === void 0 ? this.text : text, complete === void 0 ? this.complete : complete);
          },
          toString: function () {
            return 'Todo(id=' + Kotlin.toString(this.id) + (', text=' + Kotlin.toString(this.text)) + (', complete=' + Kotlin.toString(this.complete)) + ')';
          },
          hashCode: function () {
            var result = 0;
            result = result * 31 + Kotlin.hashCode(this.id) | 0;
            result = result * 31 + Kotlin.hashCode(this.text) | 0;
            result = result * 31 + Kotlin.hashCode(this.complete) | 0;
            return result;
          },
          equals_za3rmp$: function (other) {
            return this === other || (other !== null && (typeof other === 'object' && (Object.getPrototypeOf(this) === Object.getPrototypeOf(other) && (Kotlin.equals(this.id, other.id) && Kotlin.equals(this.text, other.text) && Kotlin.equals(this.complete, other.complete)))));
          }
        }),
        areAllCompleted_oze285$: function ($receiver) {
          return $receiver.size === _.todo.stores.completedCount_oze285$($receiver);
        },
        completedCount_oze285$: function ($receiver) {
          var tmp$0;
          var completed = 0;
          tmp$0 = $receiver.iterator();
          while (tmp$0.hasNext()) {
            var t = tmp$0.next();
            if (t.complete)
              completed += 1;
          }
          return completed;
        },
        TodoStore: Kotlin.createClass(function () {
          return [_.com.github.andrewoma.flux.Store];
        }, function $fun() {
          $fun.baseInitializer.call(this);
          this.todos_91fe12$ = new Kotlin.LinkedHashMap();
          _.todo.stores.todoDispatcher.register_xztz3k$(this, _.todo.actions.TodoActions.create, _.todo.stores.TodoStore.TodoStore$f(this));
          _.todo.stores.todoDispatcher.register_xztz3k$(this, _.todo.actions.TodoActions.toggleCompleteAll, _.todo.stores.TodoStore.TodoStore$f_0(this));
          _.todo.stores.todoDispatcher.register_xztz3k$(this, _.todo.actions.TodoActions.undoComplete, _.todo.stores.TodoStore.TodoStore$f_1(this));
          _.todo.stores.todoDispatcher.register_xztz3k$(this, _.todo.actions.TodoActions.complete, _.todo.stores.TodoStore.TodoStore$f_2(this));
          _.todo.stores.todoDispatcher.register_xztz3k$(this, _.todo.actions.TodoActions.update, _.todo.stores.TodoStore.TodoStore$f_3(this));
          _.todo.stores.todoDispatcher.register_xztz3k$(this, _.todo.actions.TodoActions.destroy, _.todo.stores.TodoStore.TodoStore$f_4(this));
          _.todo.stores.todoDispatcher.register_xztz3k$(this, _.todo.actions.TodoActions.destroyCompleted, _.todo.stores.TodoStore.TodoStore$f_5(this));
        }, /** @lends _.todo.stores.TodoStore.prototype */ {
          getAll: function () {
            return this.todos_91fe12$.values;
          },
          get_61zpoe$: function (id) {
            return this.todos_91fe12$.get_za3rmp$(id);
          },
          create_61zpoe$: function (text) {
            var id = ((new Date()).getTime() + Math.floor(Math.random() * 999999)).toString().toString();
            this.todos_91fe12$.put_wn2jw4$(id, new _.todo.stores.Todo(id, text, false));
          },
          update_b2pvf8$: function (id, update) {
            var existing = this.todos_91fe12$.get_za3rmp$(id);
            if (existing != null) {
              this.todos_91fe12$.put_wn2jw4$(id, update(existing));
            }
          },
          destroy_61zpoe$: function (id) {
            this.todos_91fe12$.remove_za3rmp$(id);
          },
          destroyCompleted: function () {
            var tmp$0;
            tmp$0 = this.todos_91fe12$.values.iterator();
            while (tmp$0.hasNext()) {
              var todo = tmp$0.next();
              if (todo.complete)
                this.todos_91fe12$.remove_za3rmp$(todo.id);
            }
          },
          updateAll_2qbbu$: function (update) {
            var tmp$0;
            tmp$0 = this.todos_91fe12$.values.iterator();
            while (tmp$0.hasNext()) {
              var todo = tmp$0.next();
              var updated = update(todo);
              if (updated !== todo) {
                this.todos_91fe12$.put_wn2jw4$(updated.id, updated);
              }
            }
          },
          areAllComplete: function () {
            return _.todo.stores.areAllCompleted_oze285$(this.todos_91fe12$.values);
          },
          withNonEmpty_fqkxi5$: Kotlin.defineInlineFunction('reakt.todo.stores.TodoStore.withNonEmpty_fqkxi5$', function (text, onNonEmpty) {
            var trimmed = Kotlin.modules['stdlib'].kotlin.text.trim_pdl1w0$(text);
            if (!Kotlin.modules['stdlib'].kotlin.text.isEmpty_gw00vq$(trimmed))
              onNonEmpty(trimmed);
          })
        }, /** @lends _.todo.stores.TodoStore */ {
          TodoStore$f: function (this$TodoStore) {
            return function (payload) {
              var trimmed = Kotlin.modules['stdlib'].kotlin.text.trim_pdl1w0$(payload.text);
              if (!Kotlin.modules['stdlib'].kotlin.text.isEmpty_gw00vq$(trimmed)) {
                this$TodoStore.create_61zpoe$(trimmed);
                this$TodoStore.emitChange();
              }
            };
          },
          f_0: function (complete) {
            return function (it) {
              return Kotlin.equals(it.complete, complete) ? it : it.copy_qz9155$(void 0, void 0, complete);
            };
          },
          TodoStore$f_0: function (this$TodoStore) {
            return function (payload) {
              var complete = !this$TodoStore.areAllComplete();
              this$TodoStore.updateAll_2qbbu$(_.todo.stores.TodoStore.f_0(complete));
              this$TodoStore.emitChange();
            };
          },
          f_1: function (it) {
            return it.copy_qz9155$(void 0, void 0, false);
          },
          TodoStore$f_1: function (this$TodoStore) {
            return function (payload) {
              this$TodoStore.update_b2pvf8$(payload.id, _.todo.stores.TodoStore.f_1);
              this$TodoStore.emitChange();
            };
          },
          f_2: function (it) {
            return it.copy_qz9155$(void 0, void 0, true);
          },
          TodoStore$f_2: function (this$TodoStore) {
            return function (payload) {
              this$TodoStore.update_b2pvf8$(payload.id, _.todo.stores.TodoStore.f_2);
              this$TodoStore.emitChange();
            };
          },
          f_3: function (text) {
            return function (it) {
              return it.copy_qz9155$(void 0, text);
            };
          },
          TodoStore$f_3: function (this$TodoStore) {
            return function (payload) {
              var trimmed = Kotlin.modules['stdlib'].kotlin.text.trim_pdl1w0$(payload.text);
              if (!Kotlin.modules['stdlib'].kotlin.text.isEmpty_gw00vq$(trimmed)) {
                this$TodoStore.update_b2pvf8$(payload.id, _.todo.stores.TodoStore.f_3(trimmed));
                this$TodoStore.emitChange();
              }
            };
          },
          TodoStore$f_4: function (this$TodoStore) {
            return function (payload) {
              this$TodoStore.destroy_61zpoe$(payload.id);
              this$TodoStore.emitChange();
            };
          },
          TodoStore$f_5: function (this$TodoStore) {
            return function (payload) {
              this$TodoStore.destroyCompleted();
              this$TodoStore.emitChange();
            };
          }
        })
      }),
      actions: Kotlin.definePackage(function () {
        this.TodoActions = Kotlin.createObject(null, function () {
          this.create = new _.com.github.andrewoma.flux.ActionDef(_.todo.stores.todoDispatcher);
          this.update = new _.com.github.andrewoma.flux.ActionDef(_.todo.stores.todoDispatcher);
          this.complete = new _.com.github.andrewoma.flux.ActionDef(_.todo.stores.todoDispatcher);
          this.undoComplete = new _.com.github.andrewoma.flux.ActionDef(_.todo.stores.todoDispatcher);
          this.toggleCompleteAll = new _.com.github.andrewoma.flux.ActionDef(_.todo.stores.todoDispatcher);
          this.destroy = new _.com.github.andrewoma.flux.ActionDef(_.todo.stores.todoDispatcher);
          this.destroyCompleted = new _.com.github.andrewoma.flux.ActionDef(_.todo.stores.todoDispatcher);
        }, {
          toggleComplete_1uphty$: function (todo) {
            if (todo.complete) {
              this.undoComplete.invoke_za3rmp$(new _.todo.actions.UndoCompletePayload(todo.id));
            }
             else {
              this.complete.invoke_za3rmp$(new _.todo.actions.CompletePayload(todo.id));
            }
          }
        });
      }, /** @lends _.todo.actions */ {
        TodoAction: Kotlin.createTrait(null),
        CreatePayload: Kotlin.createClass(function () {
          return [_.todo.actions.TodoAction];
        }, function (text) {
          this.text = text;
        }),
        UpdatePayload: Kotlin.createClass(function () {
          return [_.todo.actions.TodoAction];
        }, function (id, text) {
          this.id = id;
          this.text = text;
        }),
        UndoCompletePayload: Kotlin.createClass(function () {
          return [_.todo.actions.TodoAction];
        }, function (id) {
          this.id = id;
        }),
        CompletePayload: Kotlin.createClass(function () {
          return [_.todo.actions.TodoAction];
        }, function (id) {
          this.id = id;
        }),
        DestroyPayload: Kotlin.createClass(function () {
          return [_.todo.actions.TodoAction];
        }, function (id) {
          this.id = id;
        })
      }),
      components: Kotlin.definePackage(null, /** @lends _.todo.components */ {
        TodoAppState: Kotlin.createClass(null, function (todos) {
          this.todos = todos;
        }, /** @lends _.todo.components.TodoAppState.prototype */ {
          component1: function () {
            return this.todos;
          },
          copy_t0gbx$: function (todos) {
            return new _.todo.components.TodoAppState(todos === void 0 ? this.todos : todos);
          },
          toString: function () {
            return 'TodoAppState(todos=' + Kotlin.toString(this.todos) + ')';
          },
          hashCode: function () {
            var result = 0;
            result = result * 31 + Kotlin.hashCode(this.todos) | 0;
            return result;
          },
          equals_za3rmp$: function (other) {
            return this === other || (other !== null && (typeof other === 'object' && (Object.getPrototypeOf(this) === Object.getPrototypeOf(other) && Kotlin.equals(this.todos, other.todos))));
          }
        }),
        TodoApp: Kotlin.createClass(function () {
          return [_.com.github.andrewoma.react.ComponentSpec];
        }, function $fun() {
          $fun.baseInitializer.call(this);
        }, /** @lends _.todo.components.TodoApp.prototype */ {
          initialState: function () {
            return new _.todo.components.TodoAppState(_.todo.stores.todoStore.getAll());
          },
          componentDidMount: function () {
            _.todo.stores.todoStore.addChangeListener_o7wwlr$(this, _.todo.components.TodoApp.componentDidMount$f(this));
          },
          componentWillUnmount: function () {
            _.todo.stores.todoStore.removeListener_za3rmp$(this);
          },
          render_sx5o3u$: function ($receiver) {
            _.com.github.andrewoma.react.div_w5u0dm$($receiver, void 0, _.todo.components.TodoApp.render_sx5o3u$f(this));
          },
          onChange: function () {
            this.state = new _.todo.components.TodoAppState(_.todo.stores.todoStore.getAll());
          }
        }, /** @lends _.todo.components.TodoApp */ {
          object_initializer$: function () {
            return Kotlin.createObject(null, function () {
              this.factory = _.com.github.andrewoma.react.react.createFactory_oqkx6a$(new _.todo.components.TodoApp());
            });
          },
          componentDidMount$f: function (this$TodoApp) {
            return function () {
              this$TodoApp.onChange();
            };
          },
          render_sx5o3u$f: function (this$TodoApp) {
            return function () {
              _.todo.components.todoHeader_sx5o3u$(this);
              _.todo.components.todoMainSection_8kskxl$(this, new _.todo.components.MainSectionProperties(this$TodoApp.state.todos));
              _.todo.components.todoFooter_ufne8c$(this, new _.todo.components.FooterProperties(this$TodoApp.state.todos));
            };
          }
        }),
        createTodoApp: function () {
          return _.todo.components.TodoApp.object.factory.invoke(new _.com.github.andrewoma.react.Ref(null));
        },
        TodoTextInputProperties: Kotlin.createClass(null, function (className, id, placeHolder, value, onSave) {
          if (className === void 0)
            className = null;
          if (id === void 0)
            id = null;
          if (placeHolder === void 0)
            placeHolder = null;
          if (value === void 0)
            value = null;
          this.className = className;
          this.id = id;
          this.placeHolder = placeHolder;
          this.value = value;
          this.onSave = onSave;
        }),
        TodoTextInput: Kotlin.createClass(function () {
          return [_.com.github.andrewoma.react.ComponentSpec];
        }, function $fun() {
          $fun.baseInitializer.call(this);
        }, /** @lends _.todo.components.TodoTextInput.prototype */ {
          initialState: function () {
            var tmp$0;
            return (tmp$0 = this.props.value) != null ? tmp$0 : '';
          },
          render_sx5o3u$: function ($receiver) {
            _.com.github.andrewoma.react.log.debug_9mqe4v$(['TodoTextInput.render', this.props, this.state]);
            _.com.github.andrewoma.react.input_ehra6o$($receiver, _.todo.components.TodoTextInput.render_sx5o3u$f(this));
          },
          save: function () {
            this.props.onSave(this.state);
            this.state = '';
          },
          onChange_uqgllb$: function (event) {
            this.state = event.currentTarget.value;
          },
          onKeyDown_pt5yb2$: function (event) {
            if (event.keyCode === _.todo.components.TodoTextInput.object.enterKeyCode) {
              this.save();
            }
          }
        }, /** @lends _.todo.components.TodoTextInput */ {
          object_initializer$: function () {
            return Kotlin.createObject(null, function () {
              this.enterKeyCode = 13;
              this.factory = _.com.github.andrewoma.react.react.createFactory_oqkx6a$(new _.todo.components.TodoTextInput());
            });
          },
          f: function (this$TodoTextInput) {
            return function (it) {
              this$TodoTextInput.save();
            };
          },
          f_0: function (this$TodoTextInput) {
            return function (it) {
              this$TodoTextInput.onChange_uqgllb$(it);
            };
          },
          f_1: function (this$TodoTextInput) {
            return function (it) {
              this$TodoTextInput.onKeyDown_pt5yb2$(it);
            };
          },
          render_sx5o3u$f: function (this$TodoTextInput) {
            return function () {
              this.className = this$TodoTextInput.props.className;
              this.id = this$TodoTextInput.props.id;
              this.placeholder = this$TodoTextInput.props.placeHolder;
              this.onBlur = _.todo.components.TodoTextInput.f(this$TodoTextInput);
              this.onChange = _.todo.components.TodoTextInput.f_0(this$TodoTextInput);
              this.onKeyDown = _.todo.components.TodoTextInput.f_1(this$TodoTextInput);
              this.value = this$TodoTextInput.state;
              this.autoFocus = true;
            };
          }
        }),
        todoTextInput_o29w70$f: function (props) {
          return function (it) {
            return _.todo.components.TodoTextInput.object.factory.invoke(new _.com.github.andrewoma.react.Ref(props));
          };
        },
        todoTextInput_o29w70$: function ($receiver, props) {
          return $receiver.constructAndInsert_ad91at$(new _.com.github.andrewoma.react.Component(_.todo.components.todoTextInput_o29w70$f(props)));
        },
        MainSectionProperties: Kotlin.createClass(null, function (todos) {
          this.todos = todos;
        }, /** @lends _.todo.components.MainSectionProperties.prototype */ {
          component1: function () {
            return this.todos;
          },
          copy_t0gbx$: function (todos) {
            return new _.todo.components.MainSectionProperties(todos === void 0 ? this.todos : todos);
          },
          toString: function () {
            return 'MainSectionProperties(todos=' + Kotlin.toString(this.todos) + ')';
          },
          hashCode: function () {
            var result = 0;
            result = result * 31 + Kotlin.hashCode(this.todos) | 0;
            return result;
          },
          equals_za3rmp$: function (other) {
            return this === other || (other !== null && (typeof other === 'object' && (Object.getPrototypeOf(this) === Object.getPrototypeOf(other) && Kotlin.equals(this.todos, other.todos))));
          }
        }),
        MainSection: Kotlin.createClass(function () {
          return [_.com.github.andrewoma.react.ComponentSpec];
        }, function $fun() {
          $fun.baseInitializer.call(this);
        }, /** @lends _.todo.components.MainSection.prototype */ {
          render_sx5o3u$: function ($receiver) {
            _.com.github.andrewoma.react.log.debug_9mqe4v$(['MainSection.render', this.props]);
            if (this.props.todos.size < 1)
              return;
            _.com.github.andrewoma.react.section_w5u0dm$($receiver, _.todo.components.MainSection.render_sx5o3u$f, _.todo.components.MainSection.render_sx5o3u$f_0(this));
          },
          onToggleCompleteAll: function () {
            _.todo.actions.TodoActions.toggleCompleteAll.invoke_za3rmp$(null);
          }
        }, /** @lends _.todo.components.MainSection */ {
          object_initializer$: function () {
            return Kotlin.createObject(null, function () {
              this.factory = _.com.github.andrewoma.react.react.createFactory_oqkx6a$(new _.todo.components.MainSection());
            });
          },
          render_sx5o3u$f: function () {
            this.id = 'main';
          },
          f: function (this$MainSection) {
            return function (it) {
              this$MainSection.onToggleCompleteAll();
            };
          },
          f_0: function (this$MainSection) {
            return function () {
              this.id = 'toggle-all';
              this.type = 'checkbox';
              this.onChange = _.todo.components.MainSection.f(this$MainSection);
              this.checked = _.todo.stores.areAllCompleted_oze285$(this$MainSection.props.todos) ? 'checked' : '';
            };
          },
          f_1: function () {
            this.htmlFor = 'toggle-all';
          },
          f_2: function () {
            _.com.github.andrewoma.react.text_3pk7xh$(this, 'Mark all as complete');
          },
          f_3: function () {
            this.id = 'todo-list';
          },
          f_4: function (this$MainSection) {
            return function () {
              var tmp$0;
              tmp$0 = this$MainSection.props.todos.iterator();
              while (tmp$0.hasNext()) {
                var todo = tmp$0.next();
                _.todo.components.todoItem_w6isj2$(this, new _.todo.components.TodoItemProperties(todo.id, todo));
              }
            };
          },
          render_sx5o3u$f_0: function (this$MainSection) {
            return function () {
              _.com.github.andrewoma.react.input_ehra6o$(this, _.todo.components.MainSection.f_0(this$MainSection));
              _.com.github.andrewoma.react.label_46f7q$(this, _.todo.components.MainSection.f_1, _.todo.components.MainSection.f_2);
              _.com.github.andrewoma.react.ul_w5u0dm$(this, _.todo.components.MainSection.f_3, _.todo.components.MainSection.f_4(this$MainSection));
            };
          }
        }),
        todoMainSection_8kskxl$f: function (props) {
          return function (it) {
            return _.todo.components.MainSection.object.factory.invoke(new _.com.github.andrewoma.react.Ref(props));
          };
        },
        todoMainSection_8kskxl$: function ($receiver, props) {
          return $receiver.constructAndInsert_ad91at$(new _.com.github.andrewoma.react.Component(_.todo.components.todoMainSection_8kskxl$f(props)));
        },
        TodoItemProperties: Kotlin.createClass(null, function (key, todo) {
          this.key = key;
          this.todo = todo;
        }, /** @lends _.todo.components.TodoItemProperties.prototype */ {
          component1: function () {
            return this.key;
          },
          component2: function () {
            return this.todo;
          },
          copy_ig69ig$: function (key, todo) {
            return new _.todo.components.TodoItemProperties(key === void 0 ? this.key : key, todo === void 0 ? this.todo : todo);
          },
          toString: function () {
            return 'TodoItemProperties(key=' + Kotlin.toString(this.key) + (', todo=' + Kotlin.toString(this.todo)) + ')';
          },
          hashCode: function () {
            var result = 0;
            result = result * 31 + Kotlin.hashCode(this.key) | 0;
            result = result * 31 + Kotlin.hashCode(this.todo) | 0;
            return result;
          },
          equals_za3rmp$: function (other) {
            return this === other || (other !== null && (typeof other === 'object' && (Object.getPrototypeOf(this) === Object.getPrototypeOf(other) && (Kotlin.equals(this.key, other.key) && Kotlin.equals(this.todo, other.todo)))));
          }
        }),
        TodoItemState: Kotlin.createClass(null, function (isEditing) {
          if (isEditing === void 0)
            isEditing = false;
          this.isEditing = isEditing;
        }, /** @lends _.todo.components.TodoItemState.prototype */ {
          component1: function () {
            return this.isEditing;
          },
          copy_6taknv$: function (isEditing) {
            return new _.todo.components.TodoItemState(isEditing === void 0 ? this.isEditing : isEditing);
          },
          toString: function () {
            return 'TodoItemState(isEditing=' + Kotlin.toString(this.isEditing) + ')';
          },
          hashCode: function () {
            var result = 0;
            result = result * 31 + Kotlin.hashCode(this.isEditing) | 0;
            return result;
          },
          equals_za3rmp$: function (other) {
            return this === other || (other !== null && (typeof other === 'object' && (Object.getPrototypeOf(this) === Object.getPrototypeOf(other) && Kotlin.equals(this.isEditing, other.isEditing))));
          }
        }),
        TodoItem: Kotlin.createClass(function () {
          return [_.com.github.andrewoma.react.ComponentSpec];
        }, function $fun() {
          $fun.baseInitializer.call(this);
        }, /** @lends _.todo.components.TodoItem.prototype */ {
          initialState: function () {
            return new _.todo.components.TodoItemState(false);
          },
          render_sx5o3u$: function ($receiver) {
            _.com.github.andrewoma.react.log.debug_9mqe4v$(['TodoItem.render', this.props, this.state]);
            var classes = _.com.github.andrewoma.react.classSet_eoa9s7$([Kotlin.modules['stdlib'].kotlin.to_l1ob02$('completed', this.props.todo.complete), Kotlin.modules['stdlib'].kotlin.to_l1ob02$('editing', this.state.isEditing)]);
            _.com.github.andrewoma.react.li_fv5cu1$($receiver, _.todo.components.TodoItem.render_sx5o3u$f(classes, this), _.todo.components.TodoItem.render_sx5o3u$f_0(this));
          },
          onToggleComplete: function () {
            _.todo.actions.TodoActions.toggleComplete_1uphty$(this.props.todo);
          },
          onDoubleClick: function () {
            this.state = this.state.copy_6taknv$(true);
          },
          onSave_61zpoe$: function (value) {
            _.todo.actions.TodoActions.update.invoke_za3rmp$(new _.todo.actions.UpdatePayload(this.props.todo.id, value));
            this.state = this.state.copy_6taknv$(false);
          },
          onDestroyClick: function () {
            _.todo.actions.TodoActions.destroy.invoke_za3rmp$(new _.todo.actions.DestroyPayload(this.props.todo.id));
          },
          shouldComponentUpdate_wn2jw4$: function (nextProps, nextState) {
            return !(this.props.todo === nextProps.todo && this.state === nextState);
          }
        }, /** @lends _.todo.components.TodoItem */ {
          object_initializer$: function () {
            return Kotlin.createObject(null, function () {
              this.factory = _.com.github.andrewoma.react.react.createFactory_oqkx6a$(new _.todo.components.TodoItem());
            });
          },
          render_sx5o3u$f: function (classes, this$TodoItem) {
            return function () {
              this.className = classes;
              this.key = this$TodoItem.props.todo.id;
            };
          },
          f: function () {
            this.className = 'view';
          },
          f_0: function (this$TodoItem) {
            return function (it) {
              this$TodoItem.onToggleComplete();
            };
          },
          f_1: function (this$TodoItem) {
            return function () {
              this.className = 'toggle';
              this.type = 'checkbox';
              this.checked = this$TodoItem.props.todo.complete;
              this.onChange = _.todo.components.TodoItem.f_0(this$TodoItem);
            };
          },
          f_2: function (this$TodoItem) {
            return function (it) {
              this$TodoItem.onDoubleClick();
            };
          },
          f_3: function (this$TodoItem) {
            return function () {
              this.onDoubleClick = _.todo.components.TodoItem.f_2(this$TodoItem);
            };
          },
          f_4: function (this$TodoItem) {
            return function () {
              _.com.github.andrewoma.react.text_3pk7xh$(this, this$TodoItem.props.todo.text);
            };
          },
          f_5: function (this$TodoItem) {
            return function (it) {
              this$TodoItem.onDestroyClick();
            };
          },
          f_6: function (this$TodoItem) {
            return function () {
              this.className = 'destroy';
              this.onClick = _.todo.components.TodoItem.f_5(this$TodoItem);
            };
          },
          f_7: function (this$TodoItem) {
            return function () {
              _.com.github.andrewoma.react.input_ehra6o$(this, _.todo.components.TodoItem.f_1(this$TodoItem));
              _.com.github.andrewoma.react.label_46f7q$(this, _.todo.components.TodoItem.f_3(this$TodoItem), _.todo.components.TodoItem.f_4(this$TodoItem));
              _.com.github.andrewoma.react.button_7a8emq$(this, _.todo.components.TodoItem.f_6(this$TodoItem));
            };
          },
          f_8: function (this$TodoItem) {
            return function (it) {
              this$TodoItem.onSave_61zpoe$(it);
            };
          },
          render_sx5o3u$f_0: function (this$TodoItem) {
            return function () {
              _.com.github.andrewoma.react.div_w5u0dm$(this, _.todo.components.TodoItem.f, _.todo.components.TodoItem.f_7(this$TodoItem));
              if (this$TodoItem.state.isEditing) {
                _.todo.components.todoTextInput_o29w70$(this, new _.todo.components.TodoTextInputProperties('edit', void 0, void 0, this$TodoItem.props.todo.text, _.todo.components.TodoItem.f_8(this$TodoItem)));
              }
            };
          }
        }),
        todoItem_w6isj2$f: function (props) {
          return function (it) {
            return _.todo.components.TodoItem.object.factory.invoke(new _.com.github.andrewoma.react.Ref(props));
          };
        },
        todoItem_w6isj2$: function ($receiver, props) {
          return $receiver.constructAndInsert_ad91at$(new _.com.github.andrewoma.react.Component(_.todo.components.todoItem_w6isj2$f(props)));
        },
        Header: Kotlin.createClass(function () {
          return [_.com.github.andrewoma.react.ComponentSpec];
        }, function $fun() {
          $fun.baseInitializer.call(this);
        }, /** @lends _.todo.components.Header.prototype */ {
          render_sx5o3u$: function ($receiver) {
            _.com.github.andrewoma.react.log.debug_9mqe4v$(['Header.render']);
            _.com.github.andrewoma.react.header_w5u0dm$($receiver, _.todo.components.Header.render_sx5o3u$f, _.todo.components.Header.render_sx5o3u$f_0(this));
          },
          onSave_61zpoe$: function (text) {
            if (!Kotlin.modules['stdlib'].kotlin.text.isEmpty_gw00vq$(Kotlin.modules['stdlib'].kotlin.text.trim_pdl1w0$(text))) {
              _.todo.actions.TodoActions.create.invoke_za3rmp$(new _.todo.actions.CreatePayload(text));
            }
          }
        }, /** @lends _.todo.components.Header */ {
          object_initializer$: function () {
            return Kotlin.createObject(null, function () {
              this.factory = _.com.github.andrewoma.react.react.createFactory_oqkx6a$(new _.todo.components.Header());
            });
          },
          render_sx5o3u$f: function () {
            this.id = 'header';
          },
          f: function () {
            _.com.github.andrewoma.react.text_3pk7xh$(this, 'todos');
          },
          f_0: function (this$Header) {
            return function (it) {
              this$Header.onSave_61zpoe$(it);
            };
          },
          render_sx5o3u$f_0: function (this$Header) {
            return function () {
              _.com.github.andrewoma.react.h1_w5u0dm$(this, void 0, _.todo.components.Header.f);
              _.todo.components.todoTextInput_o29w70$(this, new _.todo.components.TodoTextInputProperties(void 0, 'new-todo', 'What needs to be done?', void 0, _.todo.components.Header.f_0(this$Header)));
            };
          }
        }),
        todoHeader_sx5o3u$f: function (it) {
          return _.todo.components.Header.object.factory.invoke(new _.com.github.andrewoma.react.Ref(null));
        },
        todoHeader_sx5o3u$: function ($receiver) {
          return $receiver.constructAndInsert_ad91at$(new _.com.github.andrewoma.react.Component(_.todo.components.todoHeader_sx5o3u$f));
        },
        FooterProperties: Kotlin.createClass(null, function (todos) {
          this.todos = todos;
        }, /** @lends _.todo.components.FooterProperties.prototype */ {
          component1: function () {
            return this.todos;
          },
          copy_t0gbx$: function (todos) {
            return new _.todo.components.FooterProperties(todos === void 0 ? this.todos : todos);
          },
          toString: function () {
            return 'FooterProperties(todos=' + Kotlin.toString(this.todos) + ')';
          },
          hashCode: function () {
            var result = 0;
            result = result * 31 + Kotlin.hashCode(this.todos) | 0;
            return result;
          },
          equals_za3rmp$: function (other) {
            return this === other || (other !== null && (typeof other === 'object' && (Object.getPrototypeOf(this) === Object.getPrototypeOf(other) && Kotlin.equals(this.todos, other.todos))));
          }
        }),
        Footer: Kotlin.createClass(function () {
          return [_.com.github.andrewoma.react.ComponentSpec];
        }, function $fun() {
          $fun.baseInitializer.call(this);
        }, /** @lends _.todo.components.Footer.prototype */ {
          render_sx5o3u$: function ($receiver) {
            _.com.github.andrewoma.react.log.debug_9mqe4v$(['Footer.render', this.props]);
            if (this.props.todos.isEmpty())
              return;
            var completed = _.todo.stores.completedCount_oze285$(this.props.todos);
            var itemsLeft = this.props.todos.size - completed;
            var itemsLeftPhrase = (itemsLeft === 1 ? ' item ' : ' items ') + 'left';
            _.com.github.andrewoma.react.footer_w5u0dm$($receiver, _.todo.components.Footer.render_sx5o3u$f, _.todo.components.Footer.render_sx5o3u$f_0(itemsLeft, itemsLeftPhrase, completed, this));
          },
          onClearCompletedClick: function () {
            _.todo.actions.TodoActions.destroyCompleted.invoke_za3rmp$(null);
          }
        }, /** @lends _.todo.components.Footer */ {
          object_initializer$: function () {
            return Kotlin.createObject(null, function () {
              this.factory = _.com.github.andrewoma.react.react.createFactory_oqkx6a$(new _.todo.components.Footer());
            });
          },
          render_sx5o3u$f: function () {
            this.id = 'footer';
          },
          f: function () {
            this.id = 'todo-count';
          },
          f_0: function (itemsLeft) {
            return function () {
              _.com.github.andrewoma.react.text_3pk7xh$(this, itemsLeft.toString());
            };
          },
          f_1: function (itemsLeft, itemsLeftPhrase) {
            return function () {
              _.com.github.andrewoma.react.text_3pk7xh$(_.com.github.andrewoma.react.strong_w5u0dm$(this, void 0, _.todo.components.Footer.f_0(itemsLeft)), itemsLeftPhrase);
            };
          },
          f_2: function (this$Footer) {
            return function (it) {
              this$Footer.onClearCompletedClick();
            };
          },
          f_3: function (this$Footer) {
            return function () {
              this.id = 'clear-completed';
              this.onClick = _.todo.components.Footer.f_2(this$Footer);
            };
          },
          f_4: function (completed) {
            return function () {
              _.com.github.andrewoma.react.text_3pk7xh$(this, 'Clear completed (' + completed + ')');
            };
          },
          render_sx5o3u$f_0: function (itemsLeft, itemsLeftPhrase, completed, this$Footer) {
            return function () {
              _.com.github.andrewoma.react.span_w5u0dm$(this, _.todo.components.Footer.f, _.todo.components.Footer.f_1(itemsLeft, itemsLeftPhrase));
              if (completed !== 0) {
                _.com.github.andrewoma.react.button_7a8emq$(this, _.todo.components.Footer.f_3(this$Footer), _.todo.components.Footer.f_4(completed));
              }
            };
          }
        }),
        todoFooter_ufne8c$f: function (props) {
          return function (it) {
            return _.todo.components.Footer.object.factory.invoke(new _.com.github.andrewoma.react.Ref(props));
          };
        },
        todoFooter_ufne8c$: function ($receiver, props) {
          return $receiver.constructAndInsert_ad91at$(new _.com.github.andrewoma.react.Component(_.todo.components.todoFooter_ufne8c$f(props)));
        }
      })
    }),
    com: Kotlin.definePackage(null, /** @lends _.com */ {
      github: Kotlin.definePackage(null, /** @lends _.com.github */ {
        andrewoma: Kotlin.definePackage(null, /** @lends _.com.github.andrewoma */ {
          react: Kotlin.definePackage(function () {
            this.log = new _.com.github.andrewoma.react.Log(_.com.github.andrewoma.react.logLevelFromLocation(document.location.search));
            this.react = new _.com.github.andrewoma.react.React();
          }, /** @lends _.com.github.andrewoma.react */ {
            classSet_eoa9s7$: function (classes) {
              var tmp$0, tmp$1, tmp$2;
              var sb = new Kotlin.StringBuilder();
              tmp$0 = classes, tmp$1 = tmp$0.length;
              for (var tmp$2 = 0; tmp$2 !== tmp$1; ++tmp$2) {
                var pair = tmp$0[tmp$2];
                if (pair.second)
                  sb.append(pair.first);
              }
              return sb.toString();
            },
            ReactMixin: Kotlin.createTrait(null, /** @lends _.com.github.andrewoma.react.ReactMixin.prototype */ {
              componentWillMount: function () {
              },
              componentDidMount: function () {
              },
              componentWillReceiveProps_za3rmp$: function (nextProps) {
              },
              shouldComponentUpdate_wn2jw4$: function (nextProps, nextState) {
                return true;
              },
              componentWillUpdate_wn2jw4$: function (nextProps, nextState) {
              },
              componentDidUpdate_wn2jw4$: function (nextProps, nextState) {
              },
              componentWillUnmount: function () {
              }
            }),
            Ref: Kotlin.createClass(null, function (value) {
              this.value = value;
            }),
            RefContent: Kotlin.createClass(null, function (realRef) {
              this.realRef = realRef;
            }, /** @lends _.com.github.andrewoma.react.RefContent.prototype */ {
              asComponent: function () {
                return this.realRef;
              },
              asDomNode: function () {
                return this.realRef;
              }
            }),
            ReactComponentSpec: Kotlin.createClass(function () {
              return [_.com.github.andrewoma.react.ReactMixin];
            }, function () {
              this.component = null;
              this.mixins = [];
              this.displayName = '';
            }, /** @lends _.com.github.andrewoma.react.ReactComponentSpec.prototype */ {
              refs_61zpoe$: function (refName) {
                var tmp$0;
                return new _.com.github.andrewoma.react.RefContent(((tmp$0 = this.component) != null ? tmp$0 : Kotlin.throwNPE()).refs[refName]);
              },
              state: {
                get: function () {
                  var tmp$0, tmp$1;
                  return (tmp$1 = ((tmp$0 = this.component) != null ? tmp$0 : Kotlin.throwNPE()).state.value) != null ? tmp$1 : Kotlin.throwNPE();
                },
                set: function (value) {
                  var tmp$0;
                  ((tmp$0 = this.component) != null ? tmp$0 : Kotlin.throwNPE()).setState(new _.com.github.andrewoma.react.Ref(value));
                }
              },
              props: {
                get: function () {
                  var tmp$0, tmp$1;
                  return (tmp$1 = ((tmp$0 = this.component) != null ? tmp$0 : Kotlin.throwNPE()).props.value) != null ? tmp$1 : Kotlin.throwNPE();
                },
                set: function (value) {
                  var tmp$0;
                  ((tmp$0 = this.component) != null ? tmp$0 : Kotlin.throwNPE()).setProps(new _.com.github.andrewoma.react.Ref(value), null);
                }
              },
              getInitialState: function () {
                var state = this.initialState();
                return state == null ? null : new _.com.github.andrewoma.react.Ref(state);
              },
              initialState: function () {
                return null;
              },
              getDefaultProps: function () {
                return null;
              }
            }),
            initProps_febbmr$: function (properties, init) {
              init.call(properties);
              return Reakt.flattenProperties(properties);
            },
            text_3pk7xh$f: function () {
            },
            text_3pk7xh$f_0: function (value) {
              return function (it) {
                return value;
              };
            },
            text_3pk7xh$: function ($receiver, value, init) {
              if (init === void 0)
                init = _.com.github.andrewoma.react.text_3pk7xh$f;
              return $receiver.constructAndInsert_ad91at$(new _.com.github.andrewoma.react.Component(_.com.github.andrewoma.react.text_3pk7xh$f_0(value)), init);
            },
            a_z74dev$f: function () {
            },
            a_z74dev$f_0: function () {
            },
            a_z74dev$f_1: function (properties) {
              return function (it) {
                return React.DOM.a.apply(null, [_.com.github.andrewoma.react.initProps_febbmr$(new _.com.github.andrewoma.react.AProperties(), properties)].concat(it.transformChildren()));
              };
            },
            a_z74dev$: function ($receiver, properties, init) {
              if (properties === void 0)
                properties = _.com.github.andrewoma.react.a_z74dev$f;
              if (init === void 0)
                init = _.com.github.andrewoma.react.a_z74dev$f_0;
              return $receiver.constructAndInsert_ad91at$(new _.com.github.andrewoma.react.Component(_.com.github.andrewoma.react.a_z74dev$f_1(properties)), init);
            },
            abbr_w5u0dm$f: function () {
            },
            abbr_w5u0dm$f_0: function () {
            },
            abbr_w5u0dm$f_1: function (properties) {
              return function (it) {
                return React.DOM.abbr.apply(null, [_.com.github.andrewoma.react.initProps_febbmr$(new _.com.github.andrewoma.react.HtmlGlobalProperties(), properties)].concat(it.transformChildren()));
              };
            },
            abbr_w5u0dm$: function ($receiver, properties, init) {
              if (properties === void 0)
                properties = _.com.github.andrewoma.react.abbr_w5u0dm$f;
              if (init === void 0)
                init = _.com.github.andrewoma.react.abbr_w5u0dm$f_0;
              return $receiver.constructAndInsert_ad91at$(new _.com.github.andrewoma.react.Component(_.com.github.andrewoma.react.abbr_w5u0dm$f_1(properties)), init);
            },
            address_w5u0dm$f: function () {
            },
            address_w5u0dm$f_0: function () {
            },
            address_w5u0dm$f_1: function (properties) {
              return function (it) {
                return React.DOM.address.apply(null, [_.com.github.andrewoma.react.initProps_febbmr$(new _.com.github.andrewoma.react.HtmlGlobalProperties(), properties)].concat(it.transformChildren()));
              };
            },
            address_w5u0dm$: function ($receiver, properties, init) {
              if (properties === void 0)
                properties = _.com.github.andrewoma.react.address_w5u0dm$f;
              if (init === void 0)
                init = _.com.github.andrewoma.react.address_w5u0dm$f_0;
              return $receiver.constructAndInsert_ad91at$(new _.com.github.andrewoma.react.Component(_.com.github.andrewoma.react.address_w5u0dm$f_1(properties)), init);
            },
            area_5tulbr$f: function () {
            },
            area_5tulbr$f_0: function () {
            },
            area_5tulbr$f_1: function (properties) {
              return function (it) {
                return React.DOM.area.apply(null, [_.com.github.andrewoma.react.initProps_febbmr$(new _.com.github.andrewoma.react.AreaProperties(), properties)].concat(it.transformChildren()));
              };
            },
            area_5tulbr$: function ($receiver, properties, init) {
              if (properties === void 0)
                properties = _.com.github.andrewoma.react.area_5tulbr$f;
              if (init === void 0)
                init = _.com.github.andrewoma.react.area_5tulbr$f_0;
              return $receiver.constructAndInsert_ad91at$(new _.com.github.andrewoma.react.Component(_.com.github.andrewoma.react.area_5tulbr$f_1(properties)), init);
            },
            article_w5u0dm$f: function () {
            },
            article_w5u0dm$f_0: function () {
            },
            article_w5u0dm$f_1: function (properties) {
              return function (it) {
                return React.DOM.article.apply(null, [_.com.github.andrewoma.react.initProps_febbmr$(new _.com.github.andrewoma.react.HtmlGlobalProperties(), properties)].concat(it.transformChildren()));
              };
            },
            article_w5u0dm$: function ($receiver, properties, init) {
              if (properties === void 0)
                properties = _.com.github.andrewoma.react.article_w5u0dm$f;
              if (init === void 0)
                init = _.com.github.andrewoma.react.article_w5u0dm$f_0;
              return $receiver.constructAndInsert_ad91at$(new _.com.github.andrewoma.react.Component(_.com.github.andrewoma.react.article_w5u0dm$f_1(properties)), init);
            },
            aside_w5u0dm$f: function () {
            },
            aside_w5u0dm$f_0: function () {
            },
            aside_w5u0dm$f_1: function (properties) {
              return function (it) {
                return React.DOM.aside.apply(null, [_.com.github.andrewoma.react.initProps_febbmr$(new _.com.github.andrewoma.react.HtmlGlobalProperties(), properties)].concat(it.transformChildren()));
              };
            },
            aside_w5u0dm$: function ($receiver, properties, init) {
              if (properties === void 0)
                properties = _.com.github.andrewoma.react.aside_w5u0dm$f;
              if (init === void 0)
                init = _.com.github.andrewoma.react.aside_w5u0dm$f_0;
              return $receiver.constructAndInsert_ad91at$(new _.com.github.andrewoma.react.Component(_.com.github.andrewoma.react.aside_w5u0dm$f_1(properties)), init);
            },
            audio_ih5qxw$f: function () {
            },
            audio_ih5qxw$f_0: function () {
            },
            audio_ih5qxw$f_1: function (properties) {
              return function (it) {
                return React.DOM.audio.apply(null, [_.com.github.andrewoma.react.initProps_febbmr$(new _.com.github.andrewoma.react.AudioProperties(), properties)].concat(it.transformChildren()));
              };
            },
            audio_ih5qxw$: function ($receiver, properties, init) {
              if (properties === void 0)
                properties = _.com.github.andrewoma.react.audio_ih5qxw$f;
              if (init === void 0)
                init = _.com.github.andrewoma.react.audio_ih5qxw$f_0;
              return $receiver.constructAndInsert_ad91at$(new _.com.github.andrewoma.react.Component(_.com.github.andrewoma.react.audio_ih5qxw$f_1(properties)), init);
            },
            b_w5u0dm$f: function () {
            },
            b_w5u0dm$f_0: function () {
            },
            b_w5u0dm$f_1: function (properties) {
              return function (it) {
                return React.DOM.b.apply(null, [_.com.github.andrewoma.react.initProps_febbmr$(new _.com.github.andrewoma.react.HtmlGlobalProperties(), properties)].concat(it.transformChildren()));
              };
            },
            b_w5u0dm$: function ($receiver, properties, init) {
              if (properties === void 0)
                properties = _.com.github.andrewoma.react.b_w5u0dm$f;
              if (init === void 0)
                init = _.com.github.andrewoma.react.b_w5u0dm$f_0;
              return $receiver.constructAndInsert_ad91at$(new _.com.github.andrewoma.react.Component(_.com.github.andrewoma.react.b_w5u0dm$f_1(properties)), init);
            },
            base_500i4t$f: function () {
            },
            base_500i4t$f_0: function () {
            },
            base_500i4t$f_1: function (properties) {
              return function (it) {
                return React.DOM.base.apply(null, [_.com.github.andrewoma.react.initProps_febbmr$(new _.com.github.andrewoma.react.BaseProperties(), properties)].concat(it.transformChildren()));
              };
            },
            base_500i4t$: function ($receiver, properties, init) {
              if (properties === void 0)
                properties = _.com.github.andrewoma.react.base_500i4t$f;
              if (init === void 0)
                init = _.com.github.andrewoma.react.base_500i4t$f_0;
              return $receiver.constructAndInsert_ad91at$(new _.com.github.andrewoma.react.Component(_.com.github.andrewoma.react.base_500i4t$f_1(properties)), init);
            },
            bdi_w5u0dm$f: function () {
            },
            bdi_w5u0dm$f_0: function () {
            },
            bdi_w5u0dm$f_1: function (properties) {
              return function (it) {
                return React.DOM.bdi.apply(null, [_.com.github.andrewoma.react.initProps_febbmr$(new _.com.github.andrewoma.react.HtmlGlobalProperties(), properties)].concat(it.transformChildren()));
              };
            },
            bdi_w5u0dm$: function ($receiver, properties, init) {
              if (properties === void 0)
                properties = _.com.github.andrewoma.react.bdi_w5u0dm$f;
              if (init === void 0)
                init = _.com.github.andrewoma.react.bdi_w5u0dm$f_0;
              return $receiver.constructAndInsert_ad91at$(new _.com.github.andrewoma.react.Component(_.com.github.andrewoma.react.bdi_w5u0dm$f_1(properties)), init);
            },
            bdo_w5u0dm$f: function () {
            },
            bdo_w5u0dm$f_0: function () {
            },
            bdo_w5u0dm$f_1: function (properties) {
              return function (it) {
                return React.DOM.bdo.apply(null, [_.com.github.andrewoma.react.initProps_febbmr$(new _.com.github.andrewoma.react.HtmlGlobalProperties(), properties)].concat(it.transformChildren()));
              };
            },
            bdo_w5u0dm$: function ($receiver, properties, init) {
              if (properties === void 0)
                properties = _.com.github.andrewoma.react.bdo_w5u0dm$f;
              if (init === void 0)
                init = _.com.github.andrewoma.react.bdo_w5u0dm$f_0;
              return $receiver.constructAndInsert_ad91at$(new _.com.github.andrewoma.react.Component(_.com.github.andrewoma.react.bdo_w5u0dm$f_1(properties)), init);
            },
            big_w5u0dm$f: function () {
            },
            big_w5u0dm$f_0: function () {
            },
            big_w5u0dm$f_1: function (properties) {
              return function (it) {
                return React.DOM.big.apply(null, [_.com.github.andrewoma.react.initProps_febbmr$(new _.com.github.andrewoma.react.HtmlGlobalProperties(), properties)].concat(it.transformChildren()));
              };
            },
            big_w5u0dm$: function ($receiver, properties, init) {
              if (properties === void 0)
                properties = _.com.github.andrewoma.react.big_w5u0dm$f;
              if (init === void 0)
                init = _.com.github.andrewoma.react.big_w5u0dm$f_0;
              return $receiver.constructAndInsert_ad91at$(new _.com.github.andrewoma.react.Component(_.com.github.andrewoma.react.big_w5u0dm$f_1(properties)), init);
            },
            blockquote_w5u0dm$f: function () {
            },
            blockquote_w5u0dm$f_0: function () {
            },
            blockquote_w5u0dm$f_1: function (properties) {
              return function (it) {
                return React.DOM.blockquote.apply(null, [_.com.github.andrewoma.react.initProps_febbmr$(new _.com.github.andrewoma.react.HtmlGlobalProperties(), properties)].concat(it.transformChildren()));
              };
            },
            blockquote_w5u0dm$: function ($receiver, properties, init) {
              if (properties === void 0)
                properties = _.com.github.andrewoma.react.blockquote_w5u0dm$f;
              if (init === void 0)
                init = _.com.github.andrewoma.react.blockquote_w5u0dm$f_0;
              return $receiver.constructAndInsert_ad91at$(new _.com.github.andrewoma.react.Component(_.com.github.andrewoma.react.blockquote_w5u0dm$f_1(properties)), init);
            },
            body_w5u0dm$f: function () {
            },
            body_w5u0dm$f_0: function () {
            },
            body_w5u0dm$f_1: function (properties) {
              return function (it) {
                return React.DOM.body.apply(null, [_.com.github.andrewoma.react.initProps_febbmr$(new _.com.github.andrewoma.react.HtmlGlobalProperties(), properties)].concat(it.transformChildren()));
              };
            },
            body_w5u0dm$: function ($receiver, properties, init) {
              if (properties === void 0)
                properties = _.com.github.andrewoma.react.body_w5u0dm$f;
              if (init === void 0)
                init = _.com.github.andrewoma.react.body_w5u0dm$f_0;
              return $receiver.constructAndInsert_ad91at$(new _.com.github.andrewoma.react.Component(_.com.github.andrewoma.react.body_w5u0dm$f_1(properties)), init);
            },
            br_w5u0dm$f: function () {
            },
            br_w5u0dm$f_0: function () {
            },
            br_w5u0dm$f_1: function (properties) {
              return function (it) {
                return React.DOM.br.apply(null, [_.com.github.andrewoma.react.initProps_febbmr$(new _.com.github.andrewoma.react.HtmlGlobalProperties(), properties)].concat(it.transformChildren()));
              };
            },
            br_w5u0dm$: function ($receiver, properties, init) {
              if (properties === void 0)
                properties = _.com.github.andrewoma.react.br_w5u0dm$f;
              if (init === void 0)
                init = _.com.github.andrewoma.react.br_w5u0dm$f_0;
              return $receiver.constructAndInsert_ad91at$(new _.com.github.andrewoma.react.Component(_.com.github.andrewoma.react.br_w5u0dm$f_1(properties)), init);
            },
            button_7a8emq$f: function () {
            },
            button_7a8emq$f_0: function () {
            },
            button_7a8emq$f_1: function (properties) {
              return function (it) {
                return React.DOM.button.apply(null, [_.com.github.andrewoma.react.initProps_febbmr$(new _.com.github.andrewoma.react.ButtonProperties(), properties)].concat(it.transformChildren()));
              };
            },
            button_7a8emq$: function ($receiver, properties, init) {
              if (properties === void 0)
                properties = _.com.github.andrewoma.react.button_7a8emq$f;
              if (init === void 0)
                init = _.com.github.andrewoma.react.button_7a8emq$f_0;
              return $receiver.constructAndInsert_ad91at$(new _.com.github.andrewoma.react.Component(_.com.github.andrewoma.react.button_7a8emq$f_1(properties)), init);
            },
            canvas_8v9clw$f: function () {
            },
            canvas_8v9clw$f_0: function () {
            },
            canvas_8v9clw$f_1: function (properties) {
              return function (it) {
                return React.DOM.canvas.apply(null, [_.com.github.andrewoma.react.initProps_febbmr$(new _.com.github.andrewoma.react.CanvasProperties(), properties)].concat(it.transformChildren()));
              };
            },
            canvas_8v9clw$: function ($receiver, properties, init) {
              if (properties === void 0)
                properties = _.com.github.andrewoma.react.canvas_8v9clw$f;
              if (init === void 0)
                init = _.com.github.andrewoma.react.canvas_8v9clw$f_0;
              return $receiver.constructAndInsert_ad91at$(new _.com.github.andrewoma.react.Component(_.com.github.andrewoma.react.canvas_8v9clw$f_1(properties)), init);
            },
            caption_w5u0dm$f: function () {
            },
            caption_w5u0dm$f_0: function () {
            },
            caption_w5u0dm$f_1: function (properties) {
              return function (it) {
                return React.DOM.caption.apply(null, [_.com.github.andrewoma.react.initProps_febbmr$(new _.com.github.andrewoma.react.HtmlGlobalProperties(), properties)].concat(it.transformChildren()));
              };
            },
            caption_w5u0dm$: function ($receiver, properties, init) {
              if (properties === void 0)
                properties = _.com.github.andrewoma.react.caption_w5u0dm$f;
              if (init === void 0)
                init = _.com.github.andrewoma.react.caption_w5u0dm$f_0;
              return $receiver.constructAndInsert_ad91at$(new _.com.github.andrewoma.react.Component(_.com.github.andrewoma.react.caption_w5u0dm$f_1(properties)), init);
            },
            cite_w5u0dm$f: function () {
            },
            cite_w5u0dm$f_0: function () {
            },
            cite_w5u0dm$f_1: function (properties) {
              return function (it) {
                return React.DOM.cite.apply(null, [_.com.github.andrewoma.react.initProps_febbmr$(new _.com.github.andrewoma.react.HtmlGlobalProperties(), properties)].concat(it.transformChildren()));
              };
            },
            cite_w5u0dm$: function ($receiver, properties, init) {
              if (properties === void 0)
                properties = _.com.github.andrewoma.react.cite_w5u0dm$f;
              if (init === void 0)
                init = _.com.github.andrewoma.react.cite_w5u0dm$f_0;
              return $receiver.constructAndInsert_ad91at$(new _.com.github.andrewoma.react.Component(_.com.github.andrewoma.react.cite_w5u0dm$f_1(properties)), init);
            },
            code_w5u0dm$f: function () {
            },
            code_w5u0dm$f_0: function () {
            },
            code_w5u0dm$f_1: function (properties) {
              return function (it) {
                return React.DOM.code.apply(null, [_.com.github.andrewoma.react.initProps_febbmr$(new _.com.github.andrewoma.react.HtmlGlobalProperties(), properties)].concat(it.transformChildren()));
              };
            },
            code_w5u0dm$: function ($receiver, properties, init) {
              if (properties === void 0)
                properties = _.com.github.andrewoma.react.code_w5u0dm$f;
              if (init === void 0)
                init = _.com.github.andrewoma.react.code_w5u0dm$f_0;
              return $receiver.constructAndInsert_ad91at$(new _.com.github.andrewoma.react.Component(_.com.github.andrewoma.react.code_w5u0dm$f_1(properties)), init);
            },
            col_w5u0dm$f: function () {
            },
            col_w5u0dm$f_0: function () {
            },
            col_w5u0dm$f_1: function (properties) {
              return function (it) {
                return React.DOM.col.apply(null, [_.com.github.andrewoma.react.initProps_febbmr$(new _.com.github.andrewoma.react.HtmlGlobalProperties(), properties)].concat(it.transformChildren()));
              };
            },
            col_w5u0dm$: function ($receiver, properties, init) {
              if (properties === void 0)
                properties = _.com.github.andrewoma.react.col_w5u0dm$f;
              if (init === void 0)
                init = _.com.github.andrewoma.react.col_w5u0dm$f_0;
              return $receiver.constructAndInsert_ad91at$(new _.com.github.andrewoma.react.Component(_.com.github.andrewoma.react.col_w5u0dm$f_1(properties)), init);
            },
            colgroup_w5u0dm$f: function () {
            },
            colgroup_w5u0dm$f_0: function () {
            },
            colgroup_w5u0dm$f_1: function (properties) {
              return function (it) {
                return React.DOM.colgroup.apply(null, [_.com.github.andrewoma.react.initProps_febbmr$(new _.com.github.andrewoma.react.HtmlGlobalProperties(), properties)].concat(it.transformChildren()));
              };
            },
            colgroup_w5u0dm$: function ($receiver, properties, init) {
              if (properties === void 0)
                properties = _.com.github.andrewoma.react.colgroup_w5u0dm$f;
              if (init === void 0)
                init = _.com.github.andrewoma.react.colgroup_w5u0dm$f_0;
              return $receiver.constructAndInsert_ad91at$(new _.com.github.andrewoma.react.Component(_.com.github.andrewoma.react.colgroup_w5u0dm$f_1(properties)), init);
            },
            data_w5u0dm$f: function () {
            },
            data_w5u0dm$f_0: function () {
            },
            data_w5u0dm$f_1: function (properties) {
              return function (it) {
                return React.DOM.data.apply(null, [_.com.github.andrewoma.react.initProps_febbmr$(new _.com.github.andrewoma.react.HtmlGlobalProperties(), properties)].concat(it.transformChildren()));
              };
            },
            data_w5u0dm$: function ($receiver, properties, init) {
              if (properties === void 0)
                properties = _.com.github.andrewoma.react.data_w5u0dm$f;
              if (init === void 0)
                init = _.com.github.andrewoma.react.data_w5u0dm$f_0;
              return $receiver.constructAndInsert_ad91at$(new _.com.github.andrewoma.react.Component(_.com.github.andrewoma.react.data_w5u0dm$f_1(properties)), init);
            },
            datalist_w5u0dm$f: function () {
            },
            datalist_w5u0dm$f_0: function () {
            },
            datalist_w5u0dm$f_1: function (properties) {
              return function (it) {
                return React.DOM.datalist.apply(null, [_.com.github.andrewoma.react.initProps_febbmr$(new _.com.github.andrewoma.react.HtmlGlobalProperties(), properties)].concat(it.transformChildren()));
              };
            },
            datalist_w5u0dm$: function ($receiver, properties, init) {
              if (properties === void 0)
                properties = _.com.github.andrewoma.react.datalist_w5u0dm$f;
              if (init === void 0)
                init = _.com.github.andrewoma.react.datalist_w5u0dm$f_0;
              return $receiver.constructAndInsert_ad91at$(new _.com.github.andrewoma.react.Component(_.com.github.andrewoma.react.datalist_w5u0dm$f_1(properties)), init);
            },
            dd_w5u0dm$f: function () {
            },
            dd_w5u0dm$f_0: function () {
            },
            dd_w5u0dm$f_1: function (properties) {
              return function (it) {
                return React.DOM.dd.apply(null, [_.com.github.andrewoma.react.initProps_febbmr$(new _.com.github.andrewoma.react.HtmlGlobalProperties(), properties)].concat(it.transformChildren()));
              };
            },
            dd_w5u0dm$: function ($receiver, properties, init) {
              if (properties === void 0)
                properties = _.com.github.andrewoma.react.dd_w5u0dm$f;
              if (init === void 0)
                init = _.com.github.andrewoma.react.dd_w5u0dm$f_0;
              return $receiver.constructAndInsert_ad91at$(new _.com.github.andrewoma.react.Component(_.com.github.andrewoma.react.dd_w5u0dm$f_1(properties)), init);
            },
            del_39nmmp$f: function () {
            },
            del_39nmmp$f_0: function () {
            },
            del_39nmmp$f_1: function (properties) {
              return function (it) {
                return React.DOM.del.apply(null, [_.com.github.andrewoma.react.initProps_febbmr$(new _.com.github.andrewoma.react.DelProperties(), properties)].concat(it.transformChildren()));
              };
            },
            del_39nmmp$: function ($receiver, properties, init) {
              if (properties === void 0)
                properties = _.com.github.andrewoma.react.del_39nmmp$f;
              if (init === void 0)
                init = _.com.github.andrewoma.react.del_39nmmp$f_0;
              return $receiver.constructAndInsert_ad91at$(new _.com.github.andrewoma.react.Component(_.com.github.andrewoma.react.del_39nmmp$f_1(properties)), init);
            },
            details_w5u0dm$f: function () {
            },
            details_w5u0dm$f_0: function () {
            },
            details_w5u0dm$f_1: function (properties) {
              return function (it) {
                return React.DOM.details.apply(null, [_.com.github.andrewoma.react.initProps_febbmr$(new _.com.github.andrewoma.react.HtmlGlobalProperties(), properties)].concat(it.transformChildren()));
              };
            },
            details_w5u0dm$: function ($receiver, properties, init) {
              if (properties === void 0)
                properties = _.com.github.andrewoma.react.details_w5u0dm$f;
              if (init === void 0)
                init = _.com.github.andrewoma.react.details_w5u0dm$f_0;
              return $receiver.constructAndInsert_ad91at$(new _.com.github.andrewoma.react.Component(_.com.github.andrewoma.react.details_w5u0dm$f_1(properties)), init);
            },
            dfn_w5u0dm$f: function () {
            },
            dfn_w5u0dm$f_0: function () {
            },
            dfn_w5u0dm$f_1: function (properties) {
              return function (it) {
                return React.DOM.dfn.apply(null, [_.com.github.andrewoma.react.initProps_febbmr$(new _.com.github.andrewoma.react.HtmlGlobalProperties(), properties)].concat(it.transformChildren()));
              };
            },
            dfn_w5u0dm$: function ($receiver, properties, init) {
              if (properties === void 0)
                properties = _.com.github.andrewoma.react.dfn_w5u0dm$f;
              if (init === void 0)
                init = _.com.github.andrewoma.react.dfn_w5u0dm$f_0;
              return $receiver.constructAndInsert_ad91at$(new _.com.github.andrewoma.react.Component(_.com.github.andrewoma.react.dfn_w5u0dm$f_1(properties)), init);
            },
            div_w5u0dm$f: function () {
            },
            div_w5u0dm$f_0: function () {
            },
            div_w5u0dm$f_1: function (properties) {
              return function (it) {
                return React.DOM.div.apply(null, [_.com.github.andrewoma.react.initProps_febbmr$(new _.com.github.andrewoma.react.HtmlGlobalProperties(), properties)].concat(it.transformChildren()));
              };
            },
            div_w5u0dm$: function ($receiver, properties, init) {
              if (properties === void 0)
                properties = _.com.github.andrewoma.react.div_w5u0dm$f;
              if (init === void 0)
                init = _.com.github.andrewoma.react.div_w5u0dm$f_0;
              return $receiver.constructAndInsert_ad91at$(new _.com.github.andrewoma.react.Component(_.com.github.andrewoma.react.div_w5u0dm$f_1(properties)), init);
            },
            dl_w5u0dm$f: function () {
            },
            dl_w5u0dm$f_0: function () {
            },
            dl_w5u0dm$f_1: function (properties) {
              return function (it) {
                return React.DOM.dl.apply(null, [_.com.github.andrewoma.react.initProps_febbmr$(new _.com.github.andrewoma.react.HtmlGlobalProperties(), properties)].concat(it.transformChildren()));
              };
            },
            dl_w5u0dm$: function ($receiver, properties, init) {
              if (properties === void 0)
                properties = _.com.github.andrewoma.react.dl_w5u0dm$f;
              if (init === void 0)
                init = _.com.github.andrewoma.react.dl_w5u0dm$f_0;
              return $receiver.constructAndInsert_ad91at$(new _.com.github.andrewoma.react.Component(_.com.github.andrewoma.react.dl_w5u0dm$f_1(properties)), init);
            },
            dt_w5u0dm$f: function () {
            },
            dt_w5u0dm$f_0: function () {
            },
            dt_w5u0dm$f_1: function (properties) {
              return function (it) {
                return React.DOM.dt.apply(null, [_.com.github.andrewoma.react.initProps_febbmr$(new _.com.github.andrewoma.react.HtmlGlobalProperties(), properties)].concat(it.transformChildren()));
              };
            },
            dt_w5u0dm$: function ($receiver, properties, init) {
              if (properties === void 0)
                properties = _.com.github.andrewoma.react.dt_w5u0dm$f;
              if (init === void 0)
                init = _.com.github.andrewoma.react.dt_w5u0dm$f_0;
              return $receiver.constructAndInsert_ad91at$(new _.com.github.andrewoma.react.Component(_.com.github.andrewoma.react.dt_w5u0dm$f_1(properties)), init);
            },
            em_w5u0dm$f: function () {
            },
            em_w5u0dm$f_0: function () {
            },
            em_w5u0dm$f_1: function (properties) {
              return function (it) {
                return React.DOM.em.apply(null, [_.com.github.andrewoma.react.initProps_febbmr$(new _.com.github.andrewoma.react.HtmlGlobalProperties(), properties)].concat(it.transformChildren()));
              };
            },
            em_w5u0dm$: function ($receiver, properties, init) {
              if (properties === void 0)
                properties = _.com.github.andrewoma.react.em_w5u0dm$f;
              if (init === void 0)
                init = _.com.github.andrewoma.react.em_w5u0dm$f_0;
              return $receiver.constructAndInsert_ad91at$(new _.com.github.andrewoma.react.Component(_.com.github.andrewoma.react.em_w5u0dm$f_1(properties)), init);
            },
            embed_2uw1y7$f: function () {
            },
            embed_2uw1y7$f_0: function () {
            },
            embed_2uw1y7$f_1: function (properties) {
              return function (it) {
                return React.DOM.embed.apply(null, [_.com.github.andrewoma.react.initProps_febbmr$(new _.com.github.andrewoma.react.EmbedProperties(), properties)].concat(it.transformChildren()));
              };
            },
            embed_2uw1y7$: function ($receiver, properties, init) {
              if (properties === void 0)
                properties = _.com.github.andrewoma.react.embed_2uw1y7$f;
              if (init === void 0)
                init = _.com.github.andrewoma.react.embed_2uw1y7$f_0;
              return $receiver.constructAndInsert_ad91at$(new _.com.github.andrewoma.react.Component(_.com.github.andrewoma.react.embed_2uw1y7$f_1(properties)), init);
            },
            fieldset_tpxvs4$f: function () {
            },
            fieldset_tpxvs4$f_0: function () {
            },
            fieldset_tpxvs4$f_1: function (properties) {
              return function (it) {
                return React.DOM.fieldset.apply(null, [_.com.github.andrewoma.react.initProps_febbmr$(new _.com.github.andrewoma.react.FieldsetProperties(), properties)].concat(it.transformChildren()));
              };
            },
            fieldset_tpxvs4$: function ($receiver, properties, init) {
              if (properties === void 0)
                properties = _.com.github.andrewoma.react.fieldset_tpxvs4$f;
              if (init === void 0)
                init = _.com.github.andrewoma.react.fieldset_tpxvs4$f_0;
              return $receiver.constructAndInsert_ad91at$(new _.com.github.andrewoma.react.Component(_.com.github.andrewoma.react.fieldset_tpxvs4$f_1(properties)), init);
            },
            figcaption_w5u0dm$f: function () {
            },
            figcaption_w5u0dm$f_0: function () {
            },
            figcaption_w5u0dm$f_1: function (properties) {
              return function (it) {
                return React.DOM.figcaption.apply(null, [_.com.github.andrewoma.react.initProps_febbmr$(new _.com.github.andrewoma.react.HtmlGlobalProperties(), properties)].concat(it.transformChildren()));
              };
            },
            figcaption_w5u0dm$: function ($receiver, properties, init) {
              if (properties === void 0)
                properties = _.com.github.andrewoma.react.figcaption_w5u0dm$f;
              if (init === void 0)
                init = _.com.github.andrewoma.react.figcaption_w5u0dm$f_0;
              return $receiver.constructAndInsert_ad91at$(new _.com.github.andrewoma.react.Component(_.com.github.andrewoma.react.figcaption_w5u0dm$f_1(properties)), init);
            },
            figure_w5u0dm$f: function () {
            },
            figure_w5u0dm$f_0: function () {
            },
            figure_w5u0dm$f_1: function (properties) {
              return function (it) {
                return React.DOM.figure.apply(null, [_.com.github.andrewoma.react.initProps_febbmr$(new _.com.github.andrewoma.react.HtmlGlobalProperties(), properties)].concat(it.transformChildren()));
              };
            },
            figure_w5u0dm$: function ($receiver, properties, init) {
              if (properties === void 0)
                properties = _.com.github.andrewoma.react.figure_w5u0dm$f;
              if (init === void 0)
                init = _.com.github.andrewoma.react.figure_w5u0dm$f_0;
              return $receiver.constructAndInsert_ad91at$(new _.com.github.andrewoma.react.Component(_.com.github.andrewoma.react.figure_w5u0dm$f_1(properties)), init);
            },
            footer_w5u0dm$f: function () {
            },
            footer_w5u0dm$f_0: function () {
            },
            footer_w5u0dm$f_1: function (properties) {
              return function (it) {
                return React.DOM.footer.apply(null, [_.com.github.andrewoma.react.initProps_febbmr$(new _.com.github.andrewoma.react.HtmlGlobalProperties(), properties)].concat(it.transformChildren()));
              };
            },
            footer_w5u0dm$: function ($receiver, properties, init) {
              if (properties === void 0)
                properties = _.com.github.andrewoma.react.footer_w5u0dm$f;
              if (init === void 0)
                init = _.com.github.andrewoma.react.footer_w5u0dm$f_0;
              return $receiver.constructAndInsert_ad91at$(new _.com.github.andrewoma.react.Component(_.com.github.andrewoma.react.footer_w5u0dm$f_1(properties)), init);
            },
            form_aej7ls$f: function () {
            },
            form_aej7ls$f_0: function () {
            },
            form_aej7ls$f_1: function (properties) {
              return function (it) {
                return React.DOM.form.apply(null, [_.com.github.andrewoma.react.initProps_febbmr$(new _.com.github.andrewoma.react.FormProperties(), properties)].concat(it.transformChildren()));
              };
            },
            form_aej7ls$: function ($receiver, properties, init) {
              if (properties === void 0)
                properties = _.com.github.andrewoma.react.form_aej7ls$f;
              if (init === void 0)
                init = _.com.github.andrewoma.react.form_aej7ls$f_0;
              return $receiver.constructAndInsert_ad91at$(new _.com.github.andrewoma.react.Component(_.com.github.andrewoma.react.form_aej7ls$f_1(properties)), init);
            },
            h1_w5u0dm$f: function () {
            },
            h1_w5u0dm$f_0: function () {
            },
            h1_w5u0dm$f_1: function (properties) {
              return function (it) {
                return React.DOM.h1.apply(null, [_.com.github.andrewoma.react.initProps_febbmr$(new _.com.github.andrewoma.react.HtmlGlobalProperties(), properties)].concat(it.transformChildren()));
              };
            },
            h1_w5u0dm$: function ($receiver, properties, init) {
              if (properties === void 0)
                properties = _.com.github.andrewoma.react.h1_w5u0dm$f;
              if (init === void 0)
                init = _.com.github.andrewoma.react.h1_w5u0dm$f_0;
              return $receiver.constructAndInsert_ad91at$(new _.com.github.andrewoma.react.Component(_.com.github.andrewoma.react.h1_w5u0dm$f_1(properties)), init);
            },
            h2_w5u0dm$f: function () {
            },
            h2_w5u0dm$f_0: function () {
            },
            h2_w5u0dm$f_1: function (properties) {
              return function (it) {
                return React.DOM.h2.apply(null, [_.com.github.andrewoma.react.initProps_febbmr$(new _.com.github.andrewoma.react.HtmlGlobalProperties(), properties)].concat(it.transformChildren()));
              };
            },
            h2_w5u0dm$: function ($receiver, properties, init) {
              if (properties === void 0)
                properties = _.com.github.andrewoma.react.h2_w5u0dm$f;
              if (init === void 0)
                init = _.com.github.andrewoma.react.h2_w5u0dm$f_0;
              return $receiver.constructAndInsert_ad91at$(new _.com.github.andrewoma.react.Component(_.com.github.andrewoma.react.h2_w5u0dm$f_1(properties)), init);
            },
            h3_w5u0dm$f: function () {
            },
            h3_w5u0dm$f_0: function () {
            },
            h3_w5u0dm$f_1: function (properties) {
              return function (it) {
                return React.DOM.h3.apply(null, [_.com.github.andrewoma.react.initProps_febbmr$(new _.com.github.andrewoma.react.HtmlGlobalProperties(), properties)].concat(it.transformChildren()));
              };
            },
            h3_w5u0dm$: function ($receiver, properties, init) {
              if (properties === void 0)
                properties = _.com.github.andrewoma.react.h3_w5u0dm$f;
              if (init === void 0)
                init = _.com.github.andrewoma.react.h3_w5u0dm$f_0;
              return $receiver.constructAndInsert_ad91at$(new _.com.github.andrewoma.react.Component(_.com.github.andrewoma.react.h3_w5u0dm$f_1(properties)), init);
            },
            h4_w5u0dm$f: function () {
            },
            h4_w5u0dm$f_0: function () {
            },
            h4_w5u0dm$f_1: function (properties) {
              return function (it) {
                return React.DOM.h4.apply(null, [_.com.github.andrewoma.react.initProps_febbmr$(new _.com.github.andrewoma.react.HtmlGlobalProperties(), properties)].concat(it.transformChildren()));
              };
            },
            h4_w5u0dm$: function ($receiver, properties, init) {
              if (properties === void 0)
                properties = _.com.github.andrewoma.react.h4_w5u0dm$f;
              if (init === void 0)
                init = _.com.github.andrewoma.react.h4_w5u0dm$f_0;
              return $receiver.constructAndInsert_ad91at$(new _.com.github.andrewoma.react.Component(_.com.github.andrewoma.react.h4_w5u0dm$f_1(properties)), init);
            },
            h5_w5u0dm$f: function () {
            },
            h5_w5u0dm$f_0: function () {
            },
            h5_w5u0dm$f_1: function (properties) {
              return function (it) {
                return React.DOM.h5.apply(null, [_.com.github.andrewoma.react.initProps_febbmr$(new _.com.github.andrewoma.react.HtmlGlobalProperties(), properties)].concat(it.transformChildren()));
              };
            },
            h5_w5u0dm$: function ($receiver, properties, init) {
              if (properties === void 0)
                properties = _.com.github.andrewoma.react.h5_w5u0dm$f;
              if (init === void 0)
                init = _.com.github.andrewoma.react.h5_w5u0dm$f_0;
              return $receiver.constructAndInsert_ad91at$(new _.com.github.andrewoma.react.Component(_.com.github.andrewoma.react.h5_w5u0dm$f_1(properties)), init);
            },
            h6_w5u0dm$f: function () {
            },
            h6_w5u0dm$f_0: function () {
            },
            h6_w5u0dm$f_1: function (properties) {
              return function (it) {
                return React.DOM.h6.apply(null, [_.com.github.andrewoma.react.initProps_febbmr$(new _.com.github.andrewoma.react.HtmlGlobalProperties(), properties)].concat(it.transformChildren()));
              };
            },
            h6_w5u0dm$: function ($receiver, properties, init) {
              if (properties === void 0)
                properties = _.com.github.andrewoma.react.h6_w5u0dm$f;
              if (init === void 0)
                init = _.com.github.andrewoma.react.h6_w5u0dm$f_0;
              return $receiver.constructAndInsert_ad91at$(new _.com.github.andrewoma.react.Component(_.com.github.andrewoma.react.h6_w5u0dm$f_1(properties)), init);
            },
            head_w5u0dm$f: function () {
            },
            head_w5u0dm$f_0: function () {
            },
            head_w5u0dm$f_1: function (properties) {
              return function (it) {
                return React.DOM.head.apply(null, [_.com.github.andrewoma.react.initProps_febbmr$(new _.com.github.andrewoma.react.HtmlGlobalProperties(), properties)].concat(it.transformChildren()));
              };
            },
            head_w5u0dm$: function ($receiver, properties, init) {
              if (properties === void 0)
                properties = _.com.github.andrewoma.react.head_w5u0dm$f;
              if (init === void 0)
                init = _.com.github.andrewoma.react.head_w5u0dm$f_0;
              return $receiver.constructAndInsert_ad91at$(new _.com.github.andrewoma.react.Component(_.com.github.andrewoma.react.head_w5u0dm$f_1(properties)), init);
            },
            header_w5u0dm$f: function () {
            },
            header_w5u0dm$f_0: function () {
            },
            header_w5u0dm$f_1: function (properties) {
              return function (it) {
                return React.DOM.header.apply(null, [_.com.github.andrewoma.react.initProps_febbmr$(new _.com.github.andrewoma.react.HtmlGlobalProperties(), properties)].concat(it.transformChildren()));
              };
            },
            header_w5u0dm$: function ($receiver, properties, init) {
              if (properties === void 0)
                properties = _.com.github.andrewoma.react.header_w5u0dm$f;
              if (init === void 0)
                init = _.com.github.andrewoma.react.header_w5u0dm$f_0;
              return $receiver.constructAndInsert_ad91at$(new _.com.github.andrewoma.react.Component(_.com.github.andrewoma.react.header_w5u0dm$f_1(properties)), init);
            },
            hr_w5u0dm$f: function () {
            },
            hr_w5u0dm$f_0: function () {
            },
            hr_w5u0dm$f_1: function (properties) {
              return function (it) {
                return React.DOM.hr.apply(null, [_.com.github.andrewoma.react.initProps_febbmr$(new _.com.github.andrewoma.react.HtmlGlobalProperties(), properties)].concat(it.transformChildren()));
              };
            },
            hr_w5u0dm$: function ($receiver, properties, init) {
              if (properties === void 0)
                properties = _.com.github.andrewoma.react.hr_w5u0dm$f;
              if (init === void 0)
                init = _.com.github.andrewoma.react.hr_w5u0dm$f_0;
              return $receiver.constructAndInsert_ad91at$(new _.com.github.andrewoma.react.Component(_.com.github.andrewoma.react.hr_w5u0dm$f_1(properties)), init);
            },
            html_w5u0dm$f: function () {
            },
            html_w5u0dm$f_0: function () {
            },
            html_w5u0dm$f_1: function (properties) {
              return function (it) {
                return React.DOM.html.apply(null, [_.com.github.andrewoma.react.initProps_febbmr$(new _.com.github.andrewoma.react.HtmlGlobalProperties(), properties)].concat(it.transformChildren()));
              };
            },
            html_w5u0dm$: function ($receiver, properties, init) {
              if (properties === void 0)
                properties = _.com.github.andrewoma.react.html_w5u0dm$f;
              if (init === void 0)
                init = _.com.github.andrewoma.react.html_w5u0dm$f_0;
              return $receiver.constructAndInsert_ad91at$(new _.com.github.andrewoma.react.Component(_.com.github.andrewoma.react.html_w5u0dm$f_1(properties)), init);
            },
            i_w5u0dm$f: function () {
            },
            i_w5u0dm$f_0: function () {
            },
            i_w5u0dm$f_1: function (properties) {
              return function (it) {
                return React.DOM.i.apply(null, [_.com.github.andrewoma.react.initProps_febbmr$(new _.com.github.andrewoma.react.HtmlGlobalProperties(), properties)].concat(it.transformChildren()));
              };
            },
            i_w5u0dm$: function ($receiver, properties, init) {
              if (properties === void 0)
                properties = _.com.github.andrewoma.react.i_w5u0dm$f;
              if (init === void 0)
                init = _.com.github.andrewoma.react.i_w5u0dm$f_0;
              return $receiver.constructAndInsert_ad91at$(new _.com.github.andrewoma.react.Component(_.com.github.andrewoma.react.i_w5u0dm$f_1(properties)), init);
            },
            iframe_7n7i3k$f: function () {
            },
            iframe_7n7i3k$f_0: function () {
            },
            iframe_7n7i3k$f_1: function (properties) {
              return function (it) {
                return React.DOM.iframe.apply(null, [_.com.github.andrewoma.react.initProps_febbmr$(new _.com.github.andrewoma.react.IframeProperties(), properties)].concat(it.transformChildren()));
              };
            },
            iframe_7n7i3k$: function ($receiver, properties, init) {
              if (properties === void 0)
                properties = _.com.github.andrewoma.react.iframe_7n7i3k$f;
              if (init === void 0)
                init = _.com.github.andrewoma.react.iframe_7n7i3k$f_0;
              return $receiver.constructAndInsert_ad91at$(new _.com.github.andrewoma.react.Component(_.com.github.andrewoma.react.iframe_7n7i3k$f_1(properties)), init);
            },
            img_bffj07$f: function () {
            },
            img_bffj07$f_0: function () {
            },
            img_bffj07$f_1: function (properties) {
              return function (it) {
                return React.DOM.img.apply(null, [_.com.github.andrewoma.react.initProps_febbmr$(new _.com.github.andrewoma.react.ImgProperties(), properties)].concat(it.transformChildren()));
              };
            },
            img_bffj07$: function ($receiver, properties, init) {
              if (properties === void 0)
                properties = _.com.github.andrewoma.react.img_bffj07$f;
              if (init === void 0)
                init = _.com.github.andrewoma.react.img_bffj07$f_0;
              return $receiver.constructAndInsert_ad91at$(new _.com.github.andrewoma.react.Component(_.com.github.andrewoma.react.img_bffj07$f_1(properties)), init);
            },
            input_ehra6o$f: function () {
            },
            input_ehra6o$f_0: function () {
            },
            input_ehra6o$f_1: function (properties) {
              return function (it) {
                return React.DOM.input.apply(null, [_.com.github.andrewoma.react.initProps_febbmr$(new _.com.github.andrewoma.react.InputProperties(), properties)].concat(it.transformChildren()));
              };
            },
            input_ehra6o$: function ($receiver, properties, init) {
              if (properties === void 0)
                properties = _.com.github.andrewoma.react.input_ehra6o$f;
              if (init === void 0)
                init = _.com.github.andrewoma.react.input_ehra6o$f_0;
              return $receiver.constructAndInsert_ad91at$(new _.com.github.andrewoma.react.Component(_.com.github.andrewoma.react.input_ehra6o$f_1(properties)), init);
            },
            ins_tkqh10$f: function () {
            },
            ins_tkqh10$f_0: function () {
            },
            ins_tkqh10$f_1: function (properties) {
              return function (it) {
                return React.DOM.ins.apply(null, [_.com.github.andrewoma.react.initProps_febbmr$(new _.com.github.andrewoma.react.InsProperties(), properties)].concat(it.transformChildren()));
              };
            },
            ins_tkqh10$: function ($receiver, properties, init) {
              if (properties === void 0)
                properties = _.com.github.andrewoma.react.ins_tkqh10$f;
              if (init === void 0)
                init = _.com.github.andrewoma.react.ins_tkqh10$f_0;
              return $receiver.constructAndInsert_ad91at$(new _.com.github.andrewoma.react.Component(_.com.github.andrewoma.react.ins_tkqh10$f_1(properties)), init);
            },
            kbd_w5u0dm$f: function () {
            },
            kbd_w5u0dm$f_0: function () {
            },
            kbd_w5u0dm$f_1: function (properties) {
              return function (it) {
                return React.DOM.kbd.apply(null, [_.com.github.andrewoma.react.initProps_febbmr$(new _.com.github.andrewoma.react.HtmlGlobalProperties(), properties)].concat(it.transformChildren()));
              };
            },
            kbd_w5u0dm$: function ($receiver, properties, init) {
              if (properties === void 0)
                properties = _.com.github.andrewoma.react.kbd_w5u0dm$f;
              if (init === void 0)
                init = _.com.github.andrewoma.react.kbd_w5u0dm$f_0;
              return $receiver.constructAndInsert_ad91at$(new _.com.github.andrewoma.react.Component(_.com.github.andrewoma.react.kbd_w5u0dm$f_1(properties)), init);
            },
            keygen_a3s3bh$f: function () {
            },
            keygen_a3s3bh$f_0: function () {
            },
            keygen_a3s3bh$f_1: function (properties) {
              return function (it) {
                return React.DOM.keygen.apply(null, [_.com.github.andrewoma.react.initProps_febbmr$(new _.com.github.andrewoma.react.KeygenProperties(), properties)].concat(it.transformChildren()));
              };
            },
            keygen_a3s3bh$: function ($receiver, properties, init) {
              if (properties === void 0)
                properties = _.com.github.andrewoma.react.keygen_a3s3bh$f;
              if (init === void 0)
                init = _.com.github.andrewoma.react.keygen_a3s3bh$f_0;
              return $receiver.constructAndInsert_ad91at$(new _.com.github.andrewoma.react.Component(_.com.github.andrewoma.react.keygen_a3s3bh$f_1(properties)), init);
            },
            label_46f7q$f: function () {
            },
            label_46f7q$f_0: function () {
            },
            label_46f7q$f_1: function (properties) {
              return function (it) {
                return React.DOM.label.apply(null, [_.com.github.andrewoma.react.initProps_febbmr$(new _.com.github.andrewoma.react.LabelProperties(), properties)].concat(it.transformChildren()));
              };
            },
            label_46f7q$: function ($receiver, properties, init) {
              if (properties === void 0)
                properties = _.com.github.andrewoma.react.label_46f7q$f;
              if (init === void 0)
                init = _.com.github.andrewoma.react.label_46f7q$f_0;
              return $receiver.constructAndInsert_ad91at$(new _.com.github.andrewoma.react.Component(_.com.github.andrewoma.react.label_46f7q$f_1(properties)), init);
            },
            legend_w5u0dm$f: function () {
            },
            legend_w5u0dm$f_0: function () {
            },
            legend_w5u0dm$f_1: function (properties) {
              return function (it) {
                return React.DOM.legend.apply(null, [_.com.github.andrewoma.react.initProps_febbmr$(new _.com.github.andrewoma.react.HtmlGlobalProperties(), properties)].concat(it.transformChildren()));
              };
            },
            legend_w5u0dm$: function ($receiver, properties, init) {
              if (properties === void 0)
                properties = _.com.github.andrewoma.react.legend_w5u0dm$f;
              if (init === void 0)
                init = _.com.github.andrewoma.react.legend_w5u0dm$f_0;
              return $receiver.constructAndInsert_ad91at$(new _.com.github.andrewoma.react.Component(_.com.github.andrewoma.react.legend_w5u0dm$f_1(properties)), init);
            },
            li_fv5cu1$f: function () {
            },
            li_fv5cu1$f_0: function () {
            },
            li_fv5cu1$f_1: function (properties) {
              return function (it) {
                return React.DOM.li.apply(null, [_.com.github.andrewoma.react.initProps_febbmr$(new _.com.github.andrewoma.react.LiProperties(), properties)].concat(it.transformChildren()));
              };
            },
            li_fv5cu1$: function ($receiver, properties, init) {
              if (properties === void 0)
                properties = _.com.github.andrewoma.react.li_fv5cu1$f;
              if (init === void 0)
                init = _.com.github.andrewoma.react.li_fv5cu1$f_0;
              return $receiver.constructAndInsert_ad91at$(new _.com.github.andrewoma.react.Component(_.com.github.andrewoma.react.li_fv5cu1$f_1(properties)), init);
            },
            link_u49jzq$f: function () {
            },
            link_u49jzq$f_0: function () {
            },
            link_u49jzq$f_1: function (properties) {
              return function (it) {
                return React.DOM.link.apply(null, [_.com.github.andrewoma.react.initProps_febbmr$(new _.com.github.andrewoma.react.LinkProperties(), properties)].concat(it.transformChildren()));
              };
            },
            link_u49jzq$: function ($receiver, properties, init) {
              if (properties === void 0)
                properties = _.com.github.andrewoma.react.link_u49jzq$f;
              if (init === void 0)
                init = _.com.github.andrewoma.react.link_u49jzq$f_0;
              return $receiver.constructAndInsert_ad91at$(new _.com.github.andrewoma.react.Component(_.com.github.andrewoma.react.link_u49jzq$f_1(properties)), init);
            },
            main_w5u0dm$f: function () {
            },
            main_w5u0dm$f_0: function () {
            },
            main_w5u0dm$f_1: function (properties) {
              return function (it) {
                return React.DOM.main.apply(null, [_.com.github.andrewoma.react.initProps_febbmr$(new _.com.github.andrewoma.react.HtmlGlobalProperties(), properties)].concat(it.transformChildren()));
              };
            },
            main_w5u0dm$: function ($receiver, properties, init) {
              if (properties === void 0)
                properties = _.com.github.andrewoma.react.main_w5u0dm$f;
              if (init === void 0)
                init = _.com.github.andrewoma.react.main_w5u0dm$f_0;
              return $receiver.constructAndInsert_ad91at$(new _.com.github.andrewoma.react.Component(_.com.github.andrewoma.react.main_w5u0dm$f_1(properties)), init);
            },
            map_dw7d9a$f: function () {
            },
            map_dw7d9a$f_0: function () {
            },
            map_dw7d9a$f_1: function (properties) {
              return function (it) {
                return React.DOM.map.apply(null, [_.com.github.andrewoma.react.initProps_febbmr$(new _.com.github.andrewoma.react.MapProperties(), properties)].concat(it.transformChildren()));
              };
            },
            map_dw7d9a$: function ($receiver, properties, init) {
              if (properties === void 0)
                properties = _.com.github.andrewoma.react.map_dw7d9a$f;
              if (init === void 0)
                init = _.com.github.andrewoma.react.map_dw7d9a$f_0;
              return $receiver.constructAndInsert_ad91at$(new _.com.github.andrewoma.react.Component(_.com.github.andrewoma.react.map_dw7d9a$f_1(properties)), init);
            },
            mark_w5u0dm$f: function () {
            },
            mark_w5u0dm$f_0: function () {
            },
            mark_w5u0dm$f_1: function (properties) {
              return function (it) {
                return React.DOM.mark.apply(null, [_.com.github.andrewoma.react.initProps_febbmr$(new _.com.github.andrewoma.react.HtmlGlobalProperties(), properties)].concat(it.transformChildren()));
              };
            },
            mark_w5u0dm$: function ($receiver, properties, init) {
              if (properties === void 0)
                properties = _.com.github.andrewoma.react.mark_w5u0dm$f;
              if (init === void 0)
                init = _.com.github.andrewoma.react.mark_w5u0dm$f_0;
              return $receiver.constructAndInsert_ad91at$(new _.com.github.andrewoma.react.Component(_.com.github.andrewoma.react.mark_w5u0dm$f_1(properties)), init);
            },
            menu_pcg61x$f: function () {
            },
            menu_pcg61x$f_0: function () {
            },
            menu_pcg61x$f_1: function (properties) {
              return function (it) {
                return React.DOM.menu.apply(null, [_.com.github.andrewoma.react.initProps_febbmr$(new _.com.github.andrewoma.react.MenuProperties(), properties)].concat(it.transformChildren()));
              };
            },
            menu_pcg61x$: function ($receiver, properties, init) {
              if (properties === void 0)
                properties = _.com.github.andrewoma.react.menu_pcg61x$f;
              if (init === void 0)
                init = _.com.github.andrewoma.react.menu_pcg61x$f_0;
              return $receiver.constructAndInsert_ad91at$(new _.com.github.andrewoma.react.Component(_.com.github.andrewoma.react.menu_pcg61x$f_1(properties)), init);
            },
            menuitem_w5u0dm$f: function () {
            },
            menuitem_w5u0dm$f_0: function () {
            },
            menuitem_w5u0dm$f_1: function (properties) {
              return function (it) {
                return React.DOM.menuitem.apply(null, [_.com.github.andrewoma.react.initProps_febbmr$(new _.com.github.andrewoma.react.HtmlGlobalProperties(), properties)].concat(it.transformChildren()));
              };
            },
            menuitem_w5u0dm$: function ($receiver, properties, init) {
              if (properties === void 0)
                properties = _.com.github.andrewoma.react.menuitem_w5u0dm$f;
              if (init === void 0)
                init = _.com.github.andrewoma.react.menuitem_w5u0dm$f_0;
              return $receiver.constructAndInsert_ad91at$(new _.com.github.andrewoma.react.Component(_.com.github.andrewoma.react.menuitem_w5u0dm$f_1(properties)), init);
            },
            meta_ul2c5b$f: function () {
            },
            meta_ul2c5b$f_0: function () {
            },
            meta_ul2c5b$f_1: function (properties) {
              return function (it) {
                return React.DOM.meta.apply(null, [_.com.github.andrewoma.react.initProps_febbmr$(new _.com.github.andrewoma.react.MetaProperties(), properties)].concat(it.transformChildren()));
              };
            },
            meta_ul2c5b$: function ($receiver, properties, init) {
              if (properties === void 0)
                properties = _.com.github.andrewoma.react.meta_ul2c5b$f;
              if (init === void 0)
                init = _.com.github.andrewoma.react.meta_ul2c5b$f_0;
              return $receiver.constructAndInsert_ad91at$(new _.com.github.andrewoma.react.Component(_.com.github.andrewoma.react.meta_ul2c5b$f_1(properties)), init);
            },
            meter_6kx84x$f: function () {
            },
            meter_6kx84x$f_0: function () {
            },
            meter_6kx84x$f_1: function (properties) {
              return function (it) {
                return React.DOM.meter.apply(null, [_.com.github.andrewoma.react.initProps_febbmr$(new _.com.github.andrewoma.react.MeterProperties(), properties)].concat(it.transformChildren()));
              };
            },
            meter_6kx84x$: function ($receiver, properties, init) {
              if (properties === void 0)
                properties = _.com.github.andrewoma.react.meter_6kx84x$f;
              if (init === void 0)
                init = _.com.github.andrewoma.react.meter_6kx84x$f_0;
              return $receiver.constructAndInsert_ad91at$(new _.com.github.andrewoma.react.Component(_.com.github.andrewoma.react.meter_6kx84x$f_1(properties)), init);
            },
            nav_w5u0dm$f: function () {
            },
            nav_w5u0dm$f_0: function () {
            },
            nav_w5u0dm$f_1: function (properties) {
              return function (it) {
                return React.DOM.nav.apply(null, [_.com.github.andrewoma.react.initProps_febbmr$(new _.com.github.andrewoma.react.HtmlGlobalProperties(), properties)].concat(it.transformChildren()));
              };
            },
            nav_w5u0dm$: function ($receiver, properties, init) {
              if (properties === void 0)
                properties = _.com.github.andrewoma.react.nav_w5u0dm$f;
              if (init === void 0)
                init = _.com.github.andrewoma.react.nav_w5u0dm$f_0;
              return $receiver.constructAndInsert_ad91at$(new _.com.github.andrewoma.react.Component(_.com.github.andrewoma.react.nav_w5u0dm$f_1(properties)), init);
            },
            noscript_w5u0dm$f: function () {
            },
            noscript_w5u0dm$f_0: function () {
            },
            noscript_w5u0dm$f_1: function (properties) {
              return function (it) {
                return React.DOM.noscript.apply(null, [_.com.github.andrewoma.react.initProps_febbmr$(new _.com.github.andrewoma.react.HtmlGlobalProperties(), properties)].concat(it.transformChildren()));
              };
            },
            noscript_w5u0dm$: function ($receiver, properties, init) {
              if (properties === void 0)
                properties = _.com.github.andrewoma.react.noscript_w5u0dm$f;
              if (init === void 0)
                init = _.com.github.andrewoma.react.noscript_w5u0dm$f_0;
              return $receiver.constructAndInsert_ad91at$(new _.com.github.andrewoma.react.Component(_.com.github.andrewoma.react.noscript_w5u0dm$f_1(properties)), init);
            },
            obj_108c5h$f: function () {
            },
            obj_108c5h$f_0: function () {
            },
            obj_108c5h$f_1: function (properties) {
              return function (it) {
                return React.DOM.object.apply(null, [_.com.github.andrewoma.react.initProps_febbmr$(new _.com.github.andrewoma.react.ObjectProperties(), properties)].concat(it.transformChildren()));
              };
            },
            obj_108c5h$: function ($receiver, properties, init) {
              if (properties === void 0)
                properties = _.com.github.andrewoma.react.obj_108c5h$f;
              if (init === void 0)
                init = _.com.github.andrewoma.react.obj_108c5h$f_0;
              return $receiver.constructAndInsert_ad91at$(new _.com.github.andrewoma.react.Component(_.com.github.andrewoma.react.obj_108c5h$f_1(properties)), init);
            },
            ol_w5u0dm$f: function () {
            },
            ol_w5u0dm$f_0: function () {
            },
            ol_w5u0dm$f_1: function (properties) {
              return function (it) {
                return React.DOM.ol.apply(null, [_.com.github.andrewoma.react.initProps_febbmr$(new _.com.github.andrewoma.react.HtmlGlobalProperties(), properties)].concat(it.transformChildren()));
              };
            },
            ol_w5u0dm$: function ($receiver, properties, init) {
              if (properties === void 0)
                properties = _.com.github.andrewoma.react.ol_w5u0dm$f;
              if (init === void 0)
                init = _.com.github.andrewoma.react.ol_w5u0dm$f_0;
              return $receiver.constructAndInsert_ad91at$(new _.com.github.andrewoma.react.Component(_.com.github.andrewoma.react.ol_w5u0dm$f_1(properties)), init);
            },
            optgroup_w5u0dm$f: function () {
            },
            optgroup_w5u0dm$f_0: function () {
            },
            optgroup_w5u0dm$f_1: function (properties) {
              return function (it) {
                return React.DOM.optgroup.apply(null, [_.com.github.andrewoma.react.initProps_febbmr$(new _.com.github.andrewoma.react.HtmlGlobalProperties(), properties)].concat(it.transformChildren()));
              };
            },
            optgroup_w5u0dm$: function ($receiver, properties, init) {
              if (properties === void 0)
                properties = _.com.github.andrewoma.react.optgroup_w5u0dm$f;
              if (init === void 0)
                init = _.com.github.andrewoma.react.optgroup_w5u0dm$f_0;
              return $receiver.constructAndInsert_ad91at$(new _.com.github.andrewoma.react.Component(_.com.github.andrewoma.react.optgroup_w5u0dm$f_1(properties)), init);
            },
            option_ouidv5$f: function () {
            },
            option_ouidv5$f_0: function () {
            },
            option_ouidv5$f_1: function (properties) {
              return function (it) {
                return React.DOM.option.apply(null, [_.com.github.andrewoma.react.initProps_febbmr$(new _.com.github.andrewoma.react.OptionProperties(), properties)].concat(it.transformChildren()));
              };
            },
            option_ouidv5$: function ($receiver, properties, init) {
              if (properties === void 0)
                properties = _.com.github.andrewoma.react.option_ouidv5$f;
              if (init === void 0)
                init = _.com.github.andrewoma.react.option_ouidv5$f_0;
              return $receiver.constructAndInsert_ad91at$(new _.com.github.andrewoma.react.Component(_.com.github.andrewoma.react.option_ouidv5$f_1(properties)), init);
            },
            output_px82pv$f: function () {
            },
            output_px82pv$f_0: function () {
            },
            output_px82pv$f_1: function (properties) {
              return function (it) {
                return React.DOM.output.apply(null, [_.com.github.andrewoma.react.initProps_febbmr$(new _.com.github.andrewoma.react.OutputProperties(), properties)].concat(it.transformChildren()));
              };
            },
            output_px82pv$: function ($receiver, properties, init) {
              if (properties === void 0)
                properties = _.com.github.andrewoma.react.output_px82pv$f;
              if (init === void 0)
                init = _.com.github.andrewoma.react.output_px82pv$f_0;
              return $receiver.constructAndInsert_ad91at$(new _.com.github.andrewoma.react.Component(_.com.github.andrewoma.react.output_px82pv$f_1(properties)), init);
            },
            p_w5u0dm$f: function () {
            },
            p_w5u0dm$f_0: function () {
            },
            p_w5u0dm$f_1: function (properties) {
              return function (it) {
                return React.DOM.p.apply(null, [_.com.github.andrewoma.react.initProps_febbmr$(new _.com.github.andrewoma.react.HtmlGlobalProperties(), properties)].concat(it.transformChildren()));
              };
            },
            p_w5u0dm$: function ($receiver, properties, init) {
              if (properties === void 0)
                properties = _.com.github.andrewoma.react.p_w5u0dm$f;
              if (init === void 0)
                init = _.com.github.andrewoma.react.p_w5u0dm$f_0;
              return $receiver.constructAndInsert_ad91at$(new _.com.github.andrewoma.react.Component(_.com.github.andrewoma.react.p_w5u0dm$f_1(properties)), init);
            },
            param_68qg6l$f: function () {
            },
            param_68qg6l$f_0: function () {
            },
            param_68qg6l$f_1: function (properties) {
              return function (it) {
                return React.DOM.param.apply(null, [_.com.github.andrewoma.react.initProps_febbmr$(new _.com.github.andrewoma.react.ParamProperties(), properties)].concat(it.transformChildren()));
              };
            },
            param_68qg6l$: function ($receiver, properties, init) {
              if (properties === void 0)
                properties = _.com.github.andrewoma.react.param_68qg6l$f;
              if (init === void 0)
                init = _.com.github.andrewoma.react.param_68qg6l$f_0;
              return $receiver.constructAndInsert_ad91at$(new _.com.github.andrewoma.react.Component(_.com.github.andrewoma.react.param_68qg6l$f_1(properties)), init);
            },
            pre_w5u0dm$f: function () {
            },
            pre_w5u0dm$f_0: function () {
            },
            pre_w5u0dm$f_1: function (properties) {
              return function (it) {
                return React.DOM.pre.apply(null, [_.com.github.andrewoma.react.initProps_febbmr$(new _.com.github.andrewoma.react.HtmlGlobalProperties(), properties)].concat(it.transformChildren()));
              };
            },
            pre_w5u0dm$: function ($receiver, properties, init) {
              if (properties === void 0)
                properties = _.com.github.andrewoma.react.pre_w5u0dm$f;
              if (init === void 0)
                init = _.com.github.andrewoma.react.pre_w5u0dm$f_0;
              return $receiver.constructAndInsert_ad91at$(new _.com.github.andrewoma.react.Component(_.com.github.andrewoma.react.pre_w5u0dm$f_1(properties)), init);
            },
            progress_6szicp$f: function () {
            },
            progress_6szicp$f_0: function () {
            },
            progress_6szicp$f_1: function (properties) {
              return function (it) {
                return React.DOM.progress.apply(null, [_.com.github.andrewoma.react.initProps_febbmr$(new _.com.github.andrewoma.react.ProgressProperties(), properties)].concat(it.transformChildren()));
              };
            },
            progress_6szicp$: function ($receiver, properties, init) {
              if (properties === void 0)
                properties = _.com.github.andrewoma.react.progress_6szicp$f;
              if (init === void 0)
                init = _.com.github.andrewoma.react.progress_6szicp$f_0;
              return $receiver.constructAndInsert_ad91at$(new _.com.github.andrewoma.react.Component(_.com.github.andrewoma.react.progress_6szicp$f_1(properties)), init);
            },
            q_w5u0dm$f: function () {
            },
            q_w5u0dm$f_0: function () {
            },
            q_w5u0dm$f_1: function (properties) {
              return function (it) {
                return React.DOM.q.apply(null, [_.com.github.andrewoma.react.initProps_febbmr$(new _.com.github.andrewoma.react.HtmlGlobalProperties(), properties)].concat(it.transformChildren()));
              };
            },
            q_w5u0dm$: function ($receiver, properties, init) {
              if (properties === void 0)
                properties = _.com.github.andrewoma.react.q_w5u0dm$f;
              if (init === void 0)
                init = _.com.github.andrewoma.react.q_w5u0dm$f_0;
              return $receiver.constructAndInsert_ad91at$(new _.com.github.andrewoma.react.Component(_.com.github.andrewoma.react.q_w5u0dm$f_1(properties)), init);
            },
            rp_w5u0dm$f: function () {
            },
            rp_w5u0dm$f_0: function () {
            },
            rp_w5u0dm$f_1: function (properties) {
              return function (it) {
                return React.DOM.rp.apply(null, [_.com.github.andrewoma.react.initProps_febbmr$(new _.com.github.andrewoma.react.HtmlGlobalProperties(), properties)].concat(it.transformChildren()));
              };
            },
            rp_w5u0dm$: function ($receiver, properties, init) {
              if (properties === void 0)
                properties = _.com.github.andrewoma.react.rp_w5u0dm$f;
              if (init === void 0)
                init = _.com.github.andrewoma.react.rp_w5u0dm$f_0;
              return $receiver.constructAndInsert_ad91at$(new _.com.github.andrewoma.react.Component(_.com.github.andrewoma.react.rp_w5u0dm$f_1(properties)), init);
            },
            rt_w5u0dm$f: function () {
            },
            rt_w5u0dm$f_0: function () {
            },
            rt_w5u0dm$f_1: function (properties) {
              return function (it) {
                return React.DOM.rt.apply(null, [_.com.github.andrewoma.react.initProps_febbmr$(new _.com.github.andrewoma.react.HtmlGlobalProperties(), properties)].concat(it.transformChildren()));
              };
            },
            rt_w5u0dm$: function ($receiver, properties, init) {
              if (properties === void 0)
                properties = _.com.github.andrewoma.react.rt_w5u0dm$f;
              if (init === void 0)
                init = _.com.github.andrewoma.react.rt_w5u0dm$f_0;
              return $receiver.constructAndInsert_ad91at$(new _.com.github.andrewoma.react.Component(_.com.github.andrewoma.react.rt_w5u0dm$f_1(properties)), init);
            },
            ruby_w5u0dm$f: function () {
            },
            ruby_w5u0dm$f_0: function () {
            },
            ruby_w5u0dm$f_1: function (properties) {
              return function (it) {
                return React.DOM.ruby.apply(null, [_.com.github.andrewoma.react.initProps_febbmr$(new _.com.github.andrewoma.react.HtmlGlobalProperties(), properties)].concat(it.transformChildren()));
              };
            },
            ruby_w5u0dm$: function ($receiver, properties, init) {
              if (properties === void 0)
                properties = _.com.github.andrewoma.react.ruby_w5u0dm$f;
              if (init === void 0)
                init = _.com.github.andrewoma.react.ruby_w5u0dm$f_0;
              return $receiver.constructAndInsert_ad91at$(new _.com.github.andrewoma.react.Component(_.com.github.andrewoma.react.ruby_w5u0dm$f_1(properties)), init);
            },
            s_w5u0dm$f: function () {
            },
            s_w5u0dm$f_0: function () {
            },
            s_w5u0dm$f_1: function (properties) {
              return function (it) {
                return React.DOM.s.apply(null, [_.com.github.andrewoma.react.initProps_febbmr$(new _.com.github.andrewoma.react.HtmlGlobalProperties(), properties)].concat(it.transformChildren()));
              };
            },
            s_w5u0dm$: function ($receiver, properties, init) {
              if (properties === void 0)
                properties = _.com.github.andrewoma.react.s_w5u0dm$f;
              if (init === void 0)
                init = _.com.github.andrewoma.react.s_w5u0dm$f_0;
              return $receiver.constructAndInsert_ad91at$(new _.com.github.andrewoma.react.Component(_.com.github.andrewoma.react.s_w5u0dm$f_1(properties)), init);
            },
            samp_w5u0dm$f: function () {
            },
            samp_w5u0dm$f_0: function () {
            },
            samp_w5u0dm$f_1: function (properties) {
              return function (it) {
                return React.DOM.samp.apply(null, [_.com.github.andrewoma.react.initProps_febbmr$(new _.com.github.andrewoma.react.HtmlGlobalProperties(), properties)].concat(it.transformChildren()));
              };
            },
            samp_w5u0dm$: function ($receiver, properties, init) {
              if (properties === void 0)
                properties = _.com.github.andrewoma.react.samp_w5u0dm$f;
              if (init === void 0)
                init = _.com.github.andrewoma.react.samp_w5u0dm$f_0;
              return $receiver.constructAndInsert_ad91at$(new _.com.github.andrewoma.react.Component(_.com.github.andrewoma.react.samp_w5u0dm$f_1(properties)), init);
            },
            script_y20wsn$f: function () {
            },
            script_y20wsn$f_0: function () {
            },
            script_y20wsn$f_1: function (properties) {
              return function (it) {
                return React.DOM.script.apply(null, [_.com.github.andrewoma.react.initProps_febbmr$(new _.com.github.andrewoma.react.ScriptProperties(), properties)].concat(it.transformChildren()));
              };
            },
            script_y20wsn$: function ($receiver, properties, init) {
              if (properties === void 0)
                properties = _.com.github.andrewoma.react.script_y20wsn$f;
              if (init === void 0)
                init = _.com.github.andrewoma.react.script_y20wsn$f_0;
              return $receiver.constructAndInsert_ad91at$(new _.com.github.andrewoma.react.Component(_.com.github.andrewoma.react.script_y20wsn$f_1(properties)), init);
            },
            section_w5u0dm$f: function () {
            },
            section_w5u0dm$f_0: function () {
            },
            section_w5u0dm$f_1: function (properties) {
              return function (it) {
                return React.DOM.section.apply(null, [_.com.github.andrewoma.react.initProps_febbmr$(new _.com.github.andrewoma.react.HtmlGlobalProperties(), properties)].concat(it.transformChildren()));
              };
            },
            section_w5u0dm$: function ($receiver, properties, init) {
              if (properties === void 0)
                properties = _.com.github.andrewoma.react.section_w5u0dm$f;
              if (init === void 0)
                init = _.com.github.andrewoma.react.section_w5u0dm$f_0;
              return $receiver.constructAndInsert_ad91at$(new _.com.github.andrewoma.react.Component(_.com.github.andrewoma.react.section_w5u0dm$f_1(properties)), init);
            },
            select_t7je0o$f: function () {
            },
            select_t7je0o$f_0: function () {
            },
            select_t7je0o$f_1: function (properties) {
              return function (it) {
                return React.DOM.select.apply(null, [_.com.github.andrewoma.react.initProps_febbmr$(new _.com.github.andrewoma.react.SelectProperties(), properties)].concat(it.transformChildren()));
              };
            },
            select_t7je0o$: function ($receiver, properties, init) {
              if (properties === void 0)
                properties = _.com.github.andrewoma.react.select_t7je0o$f;
              if (init === void 0)
                init = _.com.github.andrewoma.react.select_t7je0o$f_0;
              return $receiver.constructAndInsert_ad91at$(new _.com.github.andrewoma.react.Component(_.com.github.andrewoma.react.select_t7je0o$f_1(properties)), init);
            },
            small_w5u0dm$f: function () {
            },
            small_w5u0dm$f_0: function () {
            },
            small_w5u0dm$f_1: function (properties) {
              return function (it) {
                return React.DOM.small.apply(null, [_.com.github.andrewoma.react.initProps_febbmr$(new _.com.github.andrewoma.react.HtmlGlobalProperties(), properties)].concat(it.transformChildren()));
              };
            },
            small_w5u0dm$: function ($receiver, properties, init) {
              if (properties === void 0)
                properties = _.com.github.andrewoma.react.small_w5u0dm$f;
              if (init === void 0)
                init = _.com.github.andrewoma.react.small_w5u0dm$f_0;
              return $receiver.constructAndInsert_ad91at$(new _.com.github.andrewoma.react.Component(_.com.github.andrewoma.react.small_w5u0dm$f_1(properties)), init);
            },
            source_hc41ih$f: function () {
            },
            source_hc41ih$f_0: function () {
            },
            source_hc41ih$f_1: function (properties) {
              return function (it) {
                return React.DOM.source.apply(null, [_.com.github.andrewoma.react.initProps_febbmr$(new _.com.github.andrewoma.react.SourceProperties(), properties)].concat(it.transformChildren()));
              };
            },
            source_hc41ih$: function ($receiver, properties, init) {
              if (properties === void 0)
                properties = _.com.github.andrewoma.react.source_hc41ih$f;
              if (init === void 0)
                init = _.com.github.andrewoma.react.source_hc41ih$f_0;
              return $receiver.constructAndInsert_ad91at$(new _.com.github.andrewoma.react.Component(_.com.github.andrewoma.react.source_hc41ih$f_1(properties)), init);
            },
            span_w5u0dm$f: function () {
            },
            span_w5u0dm$f_0: function () {
            },
            span_w5u0dm$f_1: function (properties) {
              return function (it) {
                return React.DOM.span.apply(null, [_.com.github.andrewoma.react.initProps_febbmr$(new _.com.github.andrewoma.react.HtmlGlobalProperties(), properties)].concat(it.transformChildren()));
              };
            },
            span_w5u0dm$: function ($receiver, properties, init) {
              if (properties === void 0)
                properties = _.com.github.andrewoma.react.span_w5u0dm$f;
              if (init === void 0)
                init = _.com.github.andrewoma.react.span_w5u0dm$f_0;
              return $receiver.constructAndInsert_ad91at$(new _.com.github.andrewoma.react.Component(_.com.github.andrewoma.react.span_w5u0dm$f_1(properties)), init);
            },
            strong_w5u0dm$f: function () {
            },
            strong_w5u0dm$f_0: function () {
            },
            strong_w5u0dm$f_1: function (properties) {
              return function (it) {
                return React.DOM.strong.apply(null, [_.com.github.andrewoma.react.initProps_febbmr$(new _.com.github.andrewoma.react.HtmlGlobalProperties(), properties)].concat(it.transformChildren()));
              };
            },
            strong_w5u0dm$: function ($receiver, properties, init) {
              if (properties === void 0)
                properties = _.com.github.andrewoma.react.strong_w5u0dm$f;
              if (init === void 0)
                init = _.com.github.andrewoma.react.strong_w5u0dm$f_0;
              return $receiver.constructAndInsert_ad91at$(new _.com.github.andrewoma.react.Component(_.com.github.andrewoma.react.strong_w5u0dm$f_1(properties)), init);
            },
            style_12wp55$f: function () {
            },
            style_12wp55$f_0: function () {
            },
            style_12wp55$f_1: function (properties) {
              return function (it) {
                return React.DOM.style.apply(null, [_.com.github.andrewoma.react.initProps_febbmr$(new _.com.github.andrewoma.react.StyleProperties(), properties)].concat(it.transformChildren()));
              };
            },
            style_12wp55$: function ($receiver, properties, init) {
              if (properties === void 0)
                properties = _.com.github.andrewoma.react.style_12wp55$f;
              if (init === void 0)
                init = _.com.github.andrewoma.react.style_12wp55$f_0;
              return $receiver.constructAndInsert_ad91at$(new _.com.github.andrewoma.react.Component(_.com.github.andrewoma.react.style_12wp55$f_1(properties)), init);
            },
            sub_w5u0dm$f: function () {
            },
            sub_w5u0dm$f_0: function () {
            },
            sub_w5u0dm$f_1: function (properties) {
              return function (it) {
                return React.DOM.sub.apply(null, [_.com.github.andrewoma.react.initProps_febbmr$(new _.com.github.andrewoma.react.HtmlGlobalProperties(), properties)].concat(it.transformChildren()));
              };
            },
            sub_w5u0dm$: function ($receiver, properties, init) {
              if (properties === void 0)
                properties = _.com.github.andrewoma.react.sub_w5u0dm$f;
              if (init === void 0)
                init = _.com.github.andrewoma.react.sub_w5u0dm$f_0;
              return $receiver.constructAndInsert_ad91at$(new _.com.github.andrewoma.react.Component(_.com.github.andrewoma.react.sub_w5u0dm$f_1(properties)), init);
            },
            summary_w5u0dm$f: function () {
            },
            summary_w5u0dm$f_0: function () {
            },
            summary_w5u0dm$f_1: function (properties) {
              return function (it) {
                return React.DOM.summary.apply(null, [_.com.github.andrewoma.react.initProps_febbmr$(new _.com.github.andrewoma.react.HtmlGlobalProperties(), properties)].concat(it.transformChildren()));
              };
            },
            summary_w5u0dm$: function ($receiver, properties, init) {
              if (properties === void 0)
                properties = _.com.github.andrewoma.react.summary_w5u0dm$f;
              if (init === void 0)
                init = _.com.github.andrewoma.react.summary_w5u0dm$f_0;
              return $receiver.constructAndInsert_ad91at$(new _.com.github.andrewoma.react.Component(_.com.github.andrewoma.react.summary_w5u0dm$f_1(properties)), init);
            },
            sup_w5u0dm$f: function () {
            },
            sup_w5u0dm$f_0: function () {
            },
            sup_w5u0dm$f_1: function (properties) {
              return function (it) {
                return React.DOM.sup.apply(null, [_.com.github.andrewoma.react.initProps_febbmr$(new _.com.github.andrewoma.react.HtmlGlobalProperties(), properties)].concat(it.transformChildren()));
              };
            },
            sup_w5u0dm$: function ($receiver, properties, init) {
              if (properties === void 0)
                properties = _.com.github.andrewoma.react.sup_w5u0dm$f;
              if (init === void 0)
                init = _.com.github.andrewoma.react.sup_w5u0dm$f_0;
              return $receiver.constructAndInsert_ad91at$(new _.com.github.andrewoma.react.Component(_.com.github.andrewoma.react.sup_w5u0dm$f_1(properties)), init);
            },
            table_7swzos$f: function () {
            },
            table_7swzos$f_0: function () {
            },
            table_7swzos$f_1: function (properties) {
              return function (it) {
                return React.DOM.table.apply(null, [_.com.github.andrewoma.react.initProps_febbmr$(new _.com.github.andrewoma.react.TableProperties(), properties)].concat(it.transformChildren()));
              };
            },
            table_7swzos$: function ($receiver, properties, init) {
              if (properties === void 0)
                properties = _.com.github.andrewoma.react.table_7swzos$f;
              if (init === void 0)
                init = _.com.github.andrewoma.react.table_7swzos$f_0;
              return $receiver.constructAndInsert_ad91at$(new _.com.github.andrewoma.react.Component(_.com.github.andrewoma.react.table_7swzos$f_1(properties)), init);
            },
            tbody_w5u0dm$f: function () {
            },
            tbody_w5u0dm$f_0: function () {
            },
            tbody_w5u0dm$f_1: function (properties) {
              return function (it) {
                return React.DOM.tbody.apply(null, [_.com.github.andrewoma.react.initProps_febbmr$(new _.com.github.andrewoma.react.HtmlGlobalProperties(), properties)].concat(it.transformChildren()));
              };
            },
            tbody_w5u0dm$: function ($receiver, properties, init) {
              if (properties === void 0)
                properties = _.com.github.andrewoma.react.tbody_w5u0dm$f;
              if (init === void 0)
                init = _.com.github.andrewoma.react.tbody_w5u0dm$f_0;
              return $receiver.constructAndInsert_ad91at$(new _.com.github.andrewoma.react.Component(_.com.github.andrewoma.react.tbody_w5u0dm$f_1(properties)), init);
            },
            td_gbq2ek$f: function () {
            },
            td_gbq2ek$f_0: function () {
            },
            td_gbq2ek$f_1: function (properties) {
              return function (it) {
                return React.DOM.td.apply(null, [_.com.github.andrewoma.react.initProps_febbmr$(new _.com.github.andrewoma.react.TdProperties(), properties)].concat(it.transformChildren()));
              };
            },
            td_gbq2ek$: function ($receiver, properties, init) {
              if (properties === void 0)
                properties = _.com.github.andrewoma.react.td_gbq2ek$f;
              if (init === void 0)
                init = _.com.github.andrewoma.react.td_gbq2ek$f_0;
              return $receiver.constructAndInsert_ad91at$(new _.com.github.andrewoma.react.Component(_.com.github.andrewoma.react.td_gbq2ek$f_1(properties)), init);
            },
            textarea_xgvv3q$f: function () {
            },
            textarea_xgvv3q$f_0: function () {
            },
            textarea_xgvv3q$f_1: function (properties) {
              return function (it) {
                return React.DOM.textarea.apply(null, [_.com.github.andrewoma.react.initProps_febbmr$(new _.com.github.andrewoma.react.TextareaProperties(), properties)].concat(it.transformChildren()));
              };
            },
            textarea_xgvv3q$: function ($receiver, properties, init) {
              if (properties === void 0)
                properties = _.com.github.andrewoma.react.textarea_xgvv3q$f;
              if (init === void 0)
                init = _.com.github.andrewoma.react.textarea_xgvv3q$f_0;
              return $receiver.constructAndInsert_ad91at$(new _.com.github.andrewoma.react.Component(_.com.github.andrewoma.react.textarea_xgvv3q$f_1(properties)), init);
            },
            tfoot_w5u0dm$f: function () {
            },
            tfoot_w5u0dm$f_0: function () {
            },
            tfoot_w5u0dm$f_1: function (properties) {
              return function (it) {
                return React.DOM.tfoot.apply(null, [_.com.github.andrewoma.react.initProps_febbmr$(new _.com.github.andrewoma.react.HtmlGlobalProperties(), properties)].concat(it.transformChildren()));
              };
            },
            tfoot_w5u0dm$: function ($receiver, properties, init) {
              if (properties === void 0)
                properties = _.com.github.andrewoma.react.tfoot_w5u0dm$f;
              if (init === void 0)
                init = _.com.github.andrewoma.react.tfoot_w5u0dm$f_0;
              return $receiver.constructAndInsert_ad91at$(new _.com.github.andrewoma.react.Component(_.com.github.andrewoma.react.tfoot_w5u0dm$f_1(properties)), init);
            },
            th_cwb9e8$f: function () {
            },
            th_cwb9e8$f_0: function () {
            },
            th_cwb9e8$f_1: function (properties) {
              return function (it) {
                return React.DOM.th.apply(null, [_.com.github.andrewoma.react.initProps_febbmr$(new _.com.github.andrewoma.react.ThProperties(), properties)].concat(it.transformChildren()));
              };
            },
            th_cwb9e8$: function ($receiver, properties, init) {
              if (properties === void 0)
                properties = _.com.github.andrewoma.react.th_cwb9e8$f;
              if (init === void 0)
                init = _.com.github.andrewoma.react.th_cwb9e8$f_0;
              return $receiver.constructAndInsert_ad91at$(new _.com.github.andrewoma.react.Component(_.com.github.andrewoma.react.th_cwb9e8$f_1(properties)), init);
            },
            thead_w5u0dm$f: function () {
            },
            thead_w5u0dm$f_0: function () {
            },
            thead_w5u0dm$f_1: function (properties) {
              return function (it) {
                return React.DOM.thead.apply(null, [_.com.github.andrewoma.react.initProps_febbmr$(new _.com.github.andrewoma.react.HtmlGlobalProperties(), properties)].concat(it.transformChildren()));
              };
            },
            thead_w5u0dm$: function ($receiver, properties, init) {
              if (properties === void 0)
                properties = _.com.github.andrewoma.react.thead_w5u0dm$f;
              if (init === void 0)
                init = _.com.github.andrewoma.react.thead_w5u0dm$f_0;
              return $receiver.constructAndInsert_ad91at$(new _.com.github.andrewoma.react.Component(_.com.github.andrewoma.react.thead_w5u0dm$f_1(properties)), init);
            },
            time_hfo05l$f: function () {
            },
            time_hfo05l$f_0: function () {
            },
            time_hfo05l$f_1: function (properties) {
              return function (it) {
                return React.DOM.time.apply(null, [_.com.github.andrewoma.react.initProps_febbmr$(new _.com.github.andrewoma.react.TimeProperties(), properties)].concat(it.transformChildren()));
              };
            },
            time_hfo05l$: function ($receiver, properties, init) {
              if (properties === void 0)
                properties = _.com.github.andrewoma.react.time_hfo05l$f;
              if (init === void 0)
                init = _.com.github.andrewoma.react.time_hfo05l$f_0;
              return $receiver.constructAndInsert_ad91at$(new _.com.github.andrewoma.react.Component(_.com.github.andrewoma.react.time_hfo05l$f_1(properties)), init);
            },
            title_w5u0dm$f: function () {
            },
            title_w5u0dm$f_0: function () {
            },
            title_w5u0dm$f_1: function (properties) {
              return function (it) {
                return React.DOM.title.apply(null, [_.com.github.andrewoma.react.initProps_febbmr$(new _.com.github.andrewoma.react.HtmlGlobalProperties(), properties)].concat(it.transformChildren()));
              };
            },
            title_w5u0dm$: function ($receiver, properties, init) {
              if (properties === void 0)
                properties = _.com.github.andrewoma.react.title_w5u0dm$f;
              if (init === void 0)
                init = _.com.github.andrewoma.react.title_w5u0dm$f_0;
              return $receiver.constructAndInsert_ad91at$(new _.com.github.andrewoma.react.Component(_.com.github.andrewoma.react.title_w5u0dm$f_1(properties)), init);
            },
            tr_w5u0dm$f: function () {
            },
            tr_w5u0dm$f_0: function () {
            },
            tr_w5u0dm$f_1: function (properties) {
              return function (it) {
                return React.DOM.tr.apply(null, [_.com.github.andrewoma.react.initProps_febbmr$(new _.com.github.andrewoma.react.HtmlGlobalProperties(), properties)].concat(it.transformChildren()));
              };
            },
            tr_w5u0dm$: function ($receiver, properties, init) {
              if (properties === void 0)
                properties = _.com.github.andrewoma.react.tr_w5u0dm$f;
              if (init === void 0)
                init = _.com.github.andrewoma.react.tr_w5u0dm$f_0;
              return $receiver.constructAndInsert_ad91at$(new _.com.github.andrewoma.react.Component(_.com.github.andrewoma.react.tr_w5u0dm$f_1(properties)), init);
            },
            track_juea3z$f: function () {
            },
            track_juea3z$f_0: function () {
            },
            track_juea3z$f_1: function (properties) {
              return function (it) {
                return React.DOM.track.apply(null, [_.com.github.andrewoma.react.initProps_febbmr$(new _.com.github.andrewoma.react.TrackProperties(), properties)].concat(it.transformChildren()));
              };
            },
            track_juea3z$: function ($receiver, properties, init) {
              if (properties === void 0)
                properties = _.com.github.andrewoma.react.track_juea3z$f;
              if (init === void 0)
                init = _.com.github.andrewoma.react.track_juea3z$f_0;
              return $receiver.constructAndInsert_ad91at$(new _.com.github.andrewoma.react.Component(_.com.github.andrewoma.react.track_juea3z$f_1(properties)), init);
            },
            u_w5u0dm$f: function () {
            },
            u_w5u0dm$f_0: function () {
            },
            u_w5u0dm$f_1: function (properties) {
              return function (it) {
                return React.DOM.u.apply(null, [_.com.github.andrewoma.react.initProps_febbmr$(new _.com.github.andrewoma.react.HtmlGlobalProperties(), properties)].concat(it.transformChildren()));
              };
            },
            u_w5u0dm$: function ($receiver, properties, init) {
              if (properties === void 0)
                properties = _.com.github.andrewoma.react.u_w5u0dm$f;
              if (init === void 0)
                init = _.com.github.andrewoma.react.u_w5u0dm$f_0;
              return $receiver.constructAndInsert_ad91at$(new _.com.github.andrewoma.react.Component(_.com.github.andrewoma.react.u_w5u0dm$f_1(properties)), init);
            },
            ul_w5u0dm$f: function () {
            },
            ul_w5u0dm$f_0: function () {
            },
            ul_w5u0dm$f_1: function (properties) {
              return function (it) {
                return React.DOM.ul.apply(null, [_.com.github.andrewoma.react.initProps_febbmr$(new _.com.github.andrewoma.react.HtmlGlobalProperties(), properties)].concat(it.transformChildren()));
              };
            },
            ul_w5u0dm$: function ($receiver, properties, init) {
              if (properties === void 0)
                properties = _.com.github.andrewoma.react.ul_w5u0dm$f;
              if (init === void 0)
                init = _.com.github.andrewoma.react.ul_w5u0dm$f_0;
              return $receiver.constructAndInsert_ad91at$(new _.com.github.andrewoma.react.Component(_.com.github.andrewoma.react.ul_w5u0dm$f_1(properties)), init);
            },
            variable_w5u0dm$f: function () {
            },
            variable_w5u0dm$f_0: function () {
            },
            variable_w5u0dm$f_1: function (properties) {
              return function (it) {
                return React.DOM.var.apply(null, [_.com.github.andrewoma.react.initProps_febbmr$(new _.com.github.andrewoma.react.HtmlGlobalProperties(), properties)].concat(it.transformChildren()));
              };
            },
            variable_w5u0dm$: function ($receiver, properties, init) {
              if (properties === void 0)
                properties = _.com.github.andrewoma.react.variable_w5u0dm$f;
              if (init === void 0)
                init = _.com.github.andrewoma.react.variable_w5u0dm$f_0;
              return $receiver.constructAndInsert_ad91at$(new _.com.github.andrewoma.react.Component(_.com.github.andrewoma.react.variable_w5u0dm$f_1(properties)), init);
            },
            video_885pq7$f: function () {
            },
            video_885pq7$f_0: function () {
            },
            video_885pq7$f_1: function (properties) {
              return function (it) {
                return React.DOM.video.apply(null, [_.com.github.andrewoma.react.initProps_febbmr$(new _.com.github.andrewoma.react.VideoProperties(), properties)].concat(it.transformChildren()));
              };
            },
            video_885pq7$: function ($receiver, properties, init) {
              if (properties === void 0)
                properties = _.com.github.andrewoma.react.video_885pq7$f;
              if (init === void 0)
                init = _.com.github.andrewoma.react.video_885pq7$f_0;
              return $receiver.constructAndInsert_ad91at$(new _.com.github.andrewoma.react.Component(_.com.github.andrewoma.react.video_885pq7$f_1(properties)), init);
            },
            wbr_w5u0dm$f: function () {
            },
            wbr_w5u0dm$f_0: function () {
            },
            wbr_w5u0dm$f_1: function (properties) {
              return function (it) {
                return React.DOM.wbr.apply(null, [_.com.github.andrewoma.react.initProps_febbmr$(new _.com.github.andrewoma.react.HtmlGlobalProperties(), properties)].concat(it.transformChildren()));
              };
            },
            wbr_w5u0dm$: function ($receiver, properties, init) {
              if (properties === void 0)
                properties = _.com.github.andrewoma.react.wbr_w5u0dm$f;
              if (init === void 0)
                init = _.com.github.andrewoma.react.wbr_w5u0dm$f_0;
              return $receiver.constructAndInsert_ad91at$(new _.com.github.andrewoma.react.Component(_.com.github.andrewoma.react.wbr_w5u0dm$f_1(properties)), init);
            },
            circle_k62a52$f: function () {
            },
            circle_k62a52$f_0: function () {
            },
            circle_k62a52$f_1: function (properties) {
              return function (it) {
                return React.DOM.circle.apply(null, [_.com.github.andrewoma.react.initProps_febbmr$(new _.com.github.andrewoma.react.SvgProperties(), properties)].concat(it.transformChildren()));
              };
            },
            circle_k62a52$: function ($receiver, properties, init) {
              if (properties === void 0)
                properties = _.com.github.andrewoma.react.circle_k62a52$f;
              if (init === void 0)
                init = _.com.github.andrewoma.react.circle_k62a52$f_0;
              return $receiver.constructAndInsert_ad91at$(new _.com.github.andrewoma.react.Component(_.com.github.andrewoma.react.circle_k62a52$f_1(properties)), init);
            },
            g_k62a52$f: function () {
            },
            g_k62a52$f_0: function () {
            },
            g_k62a52$f_1: function (properties) {
              return function (it) {
                return React.DOM.g.apply(null, [_.com.github.andrewoma.react.initProps_febbmr$(new _.com.github.andrewoma.react.SvgProperties(), properties)].concat(it.transformChildren()));
              };
            },
            g_k62a52$: function ($receiver, properties, init) {
              if (properties === void 0)
                properties = _.com.github.andrewoma.react.g_k62a52$f;
              if (init === void 0)
                init = _.com.github.andrewoma.react.g_k62a52$f_0;
              return $receiver.constructAndInsert_ad91at$(new _.com.github.andrewoma.react.Component(_.com.github.andrewoma.react.g_k62a52$f_1(properties)), init);
            },
            line_k62a52$f: function () {
            },
            line_k62a52$f_0: function () {
            },
            line_k62a52$f_1: function (properties) {
              return function (it) {
                return React.DOM.line.apply(null, [_.com.github.andrewoma.react.initProps_febbmr$(new _.com.github.andrewoma.react.SvgProperties(), properties)].concat(it.transformChildren()));
              };
            },
            line_k62a52$: function ($receiver, properties, init) {
              if (properties === void 0)
                properties = _.com.github.andrewoma.react.line_k62a52$f;
              if (init === void 0)
                init = _.com.github.andrewoma.react.line_k62a52$f_0;
              return $receiver.constructAndInsert_ad91at$(new _.com.github.andrewoma.react.Component(_.com.github.andrewoma.react.line_k62a52$f_1(properties)), init);
            },
            path_k62a52$f: function () {
            },
            path_k62a52$f_0: function () {
            },
            path_k62a52$f_1: function (properties) {
              return function (it) {
                return React.DOM.path.apply(null, [_.com.github.andrewoma.react.initProps_febbmr$(new _.com.github.andrewoma.react.SvgProperties(), properties)].concat(it.transformChildren()));
              };
            },
            path_k62a52$: function ($receiver, properties, init) {
              if (properties === void 0)
                properties = _.com.github.andrewoma.react.path_k62a52$f;
              if (init === void 0)
                init = _.com.github.andrewoma.react.path_k62a52$f_0;
              return $receiver.constructAndInsert_ad91at$(new _.com.github.andrewoma.react.Component(_.com.github.andrewoma.react.path_k62a52$f_1(properties)), init);
            },
            polygon_k62a52$f: function () {
            },
            polygon_k62a52$f_0: function () {
            },
            polygon_k62a52$f_1: function (properties) {
              return function (it) {
                return React.DOM.polygon.apply(null, [_.com.github.andrewoma.react.initProps_febbmr$(new _.com.github.andrewoma.react.SvgProperties(), properties)].concat(it.transformChildren()));
              };
            },
            polygon_k62a52$: function ($receiver, properties, init) {
              if (properties === void 0)
                properties = _.com.github.andrewoma.react.polygon_k62a52$f;
              if (init === void 0)
                init = _.com.github.andrewoma.react.polygon_k62a52$f_0;
              return $receiver.constructAndInsert_ad91at$(new _.com.github.andrewoma.react.Component(_.com.github.andrewoma.react.polygon_k62a52$f_1(properties)), init);
            },
            polyline_k62a52$f: function () {
            },
            polyline_k62a52$f_0: function () {
            },
            polyline_k62a52$f_1: function (properties) {
              return function (it) {
                return React.DOM.polyline.apply(null, [_.com.github.andrewoma.react.initProps_febbmr$(new _.com.github.andrewoma.react.SvgProperties(), properties)].concat(it.transformChildren()));
              };
            },
            polyline_k62a52$: function ($receiver, properties, init) {
              if (properties === void 0)
                properties = _.com.github.andrewoma.react.polyline_k62a52$f;
              if (init === void 0)
                init = _.com.github.andrewoma.react.polyline_k62a52$f_0;
              return $receiver.constructAndInsert_ad91at$(new _.com.github.andrewoma.react.Component(_.com.github.andrewoma.react.polyline_k62a52$f_1(properties)), init);
            },
            rect_k62a52$f: function () {
            },
            rect_k62a52$f_0: function () {
            },
            rect_k62a52$f_1: function (properties) {
              return function (it) {
                return React.DOM.rect.apply(null, [_.com.github.andrewoma.react.initProps_febbmr$(new _.com.github.andrewoma.react.SvgProperties(), properties)].concat(it.transformChildren()));
              };
            },
            rect_k62a52$: function ($receiver, properties, init) {
              if (properties === void 0)
                properties = _.com.github.andrewoma.react.rect_k62a52$f;
              if (init === void 0)
                init = _.com.github.andrewoma.react.rect_k62a52$f_0;
              return $receiver.constructAndInsert_ad91at$(new _.com.github.andrewoma.react.Component(_.com.github.andrewoma.react.rect_k62a52$f_1(properties)), init);
            },
            svg_k62a52$f: function () {
            },
            svg_k62a52$f_0: function () {
            },
            svg_k62a52$f_1: function (properties) {
              return function (it) {
                return React.DOM.svg.apply(null, [_.com.github.andrewoma.react.initProps_febbmr$(new _.com.github.andrewoma.react.SvgProperties(), properties)].concat(it.transformChildren()));
              };
            },
            svg_k62a52$: function ($receiver, properties, init) {
              if (properties === void 0)
                properties = _.com.github.andrewoma.react.svg_k62a52$f;
              if (init === void 0)
                init = _.com.github.andrewoma.react.svg_k62a52$f_0;
              return $receiver.constructAndInsert_ad91at$(new _.com.github.andrewoma.react.Component(_.com.github.andrewoma.react.svg_k62a52$f_1(properties)), init);
            },
            text_k62a52$f: function () {
            },
            text_k62a52$f_0: function () {
            },
            text_k62a52$f_1: function (properties) {
              return function (it) {
                return React.DOM.text.apply(null, [_.com.github.andrewoma.react.initProps_febbmr$(new _.com.github.andrewoma.react.SvgProperties(), properties)].concat(it.transformChildren()));
              };
            },
            text_k62a52$: function ($receiver, properties, init) {
              if (properties === void 0)
                properties = _.com.github.andrewoma.react.text_k62a52$f;
              if (init === void 0)
                init = _.com.github.andrewoma.react.text_k62a52$f_0;
              return $receiver.constructAndInsert_ad91at$(new _.com.github.andrewoma.react.Component(_.com.github.andrewoma.react.text_k62a52$f_1(properties)), init);
            },
            ReadWriteProperty: Kotlin.createTrait(null),
            Property: Kotlin.createClass(function () {
              return [_.com.github.andrewoma.react.ReadWriteProperty];
            }, null, /** @lends _.com.github.andrewoma.react.Property.prototype */ {
              getValue_dsk1ci$: function (thisRef, property) {
                return Reakt.getProperty(thisRef != null ? thisRef : Kotlin.throwNPE(), property.name);
              },
              setValue_w32e13$: function (thisRef, property, value) {
                Reakt.setProperty(thisRef != null ? thisRef : Kotlin.throwNPE(), property.name, value);
              }
            }),
            check_8kj6y5$: function (condition, message) {
              if (message === void 0)
                message = 'Assertion failed';
              if (!condition) {
                throw new Kotlin.Exception(message);
              }
            },
            ComponentRenderer: Kotlin.createTrait(null, /** @lends _.com.github.andrewoma.react.ComponentRenderer.prototype */ {
              render: function () {
                var root = _.com.github.andrewoma.react.ComponentRenderer.render$f();
                this.render_sx5o3u$(root);
                _.com.github.andrewoma.react.check_8kj6y5$(root.children.size <= 1, 'React only supports one (or zero) root components');
                if (root.children.isEmpty())
                  return null;
                return root.children.get_za3lpa$(0).transform();
              }
            }, /** @lends _.com.github.andrewoma.react.ComponentRenderer */ {
              f: function (it) {
                return 0;
              },
              render$f: function () {
                return Kotlin.createObject(function () {
                  return [_.com.github.andrewoma.react.Component];
                }, function $fun() {
                  $fun.baseInitializer.call(this, _.com.github.andrewoma.react.ComponentRenderer.f);
                });
              }
            }),
            ComponentSpec: Kotlin.createClass(function () {
              return [_.com.github.andrewoma.react.ComponentRenderer, _.com.github.andrewoma.react.ReactComponentSpec];
            }, function $fun() {
              $fun.baseInitializer.call(this);
            }),
            Component: Kotlin.createClass(null, function (transformer) {
              this.transformer = transformer;
              this.children = new Kotlin.ArrayList();
            }, /** @lends _.com.github.andrewoma.react.Component.prototype */ {
              constructAndInsert_ad91at$: function (component, init) {
                if (init === void 0)
                  init = _.com.github.andrewoma.react.Component.constructAndInsert_ad91at$f;
                init.call(component);
                this.children.add_za3rmp$(component);
                return component;
              },
              transform: function () {
                return this.transformer(this);
              },
              transformChildren: function () {
                var size = this.children.size;
                var init = _.com.github.andrewoma.react.Component.transformChildren$f(this);
                var tmp$0;
                var result = Kotlin.nullArray(size);
                tmp$0 = size - 1;
                for (var i = 0; i <= tmp$0; i++) {
                  result[i] = init(i);
                }
                return result;
              }
            }, /** @lends _.com.github.andrewoma.react.Component */ {
              constructAndInsert_ad91at$f: function () {
              },
              transformChildren$f: function (this$Component) {
                return function (it) {
                  return this$Component.children.get_za3lpa$(it).transform();
                };
              }
            }),
            EventTarget: Kotlin.createTrait(null),
            DataTransfer: Kotlin.createTrait(null),
            Style: Kotlin.createClass(null, null),
            SyntheticEvent: Kotlin.createTrait(null),
            ClipboardEvent: Kotlin.createTrait(function () {
              return [_.com.github.andrewoma.react.SyntheticEvent];
            }),
            KeyboardEvent: Kotlin.createTrait(function () {
              return [_.com.github.andrewoma.react.SyntheticEvent];
            }),
            FocusEvent: Kotlin.createTrait(function () {
              return [_.com.github.andrewoma.react.SyntheticEvent];
            }),
            FormEvent: Kotlin.createTrait(function () {
              return [_.com.github.andrewoma.react.SyntheticEvent];
            }),
            MouseEvent: Kotlin.createTrait(function () {
              return [_.com.github.andrewoma.react.SyntheticEvent];
            }),
            TouchEvent: Kotlin.createTrait(function () {
              return [_.com.github.andrewoma.react.SyntheticEvent];
            }),
            UIEvent: Kotlin.createTrait(function () {
              return [_.com.github.andrewoma.react.SyntheticEvent];
            }),
            WheelEvent: Kotlin.createTrait(null),
            ReactProperties: Kotlin.createClass(null, function () {
              this.key$delegate = new _.com.github.andrewoma.react.Property();
              this.ref$delegate = new _.com.github.andrewoma.react.Property();
              this.onCopy$delegate = new _.com.github.andrewoma.react.Property();
              this.onCut$delegate = new _.com.github.andrewoma.react.Property();
              this.onPaste$delegate = new _.com.github.andrewoma.react.Property();
              this.onKeyDown$delegate = new _.com.github.andrewoma.react.Property();
              this.onKeyPress$delegate = new _.com.github.andrewoma.react.Property();
              this.onKeyUp$delegate = new _.com.github.andrewoma.react.Property();
              this.onFocus$delegate = new _.com.github.andrewoma.react.Property();
              this.onBlur$delegate = new _.com.github.andrewoma.react.Property();
              this.onChange$delegate = new _.com.github.andrewoma.react.Property();
              this.onInput$delegate = new _.com.github.andrewoma.react.Property();
              this.onSubmit$delegate = new _.com.github.andrewoma.react.Property();
              this.onClick$delegate = new _.com.github.andrewoma.react.Property();
              this.onDoubleClick$delegate = new _.com.github.andrewoma.react.Property();
              this.onDrag$delegate = new _.com.github.andrewoma.react.Property();
              this.onDragEnd$delegate = new _.com.github.andrewoma.react.Property();
              this.onDragEnter$delegate = new _.com.github.andrewoma.react.Property();
              this.onDragExit$delegate = new _.com.github.andrewoma.react.Property();
              this.onDragLeave$delegate = new _.com.github.andrewoma.react.Property();
              this.onDragOver$delegate = new _.com.github.andrewoma.react.Property();
              this.onDragStart$delegate = new _.com.github.andrewoma.react.Property();
              this.onDrop$delegate = new _.com.github.andrewoma.react.Property();
              this.onMouseDown$delegate = new _.com.github.andrewoma.react.Property();
              this.onMouseEnter$delegate = new _.com.github.andrewoma.react.Property();
              this.onMouseLeave$delegate = new _.com.github.andrewoma.react.Property();
              this.onMouseMove$delegate = new _.com.github.andrewoma.react.Property();
              this.onMouseUp$delegate = new _.com.github.andrewoma.react.Property();
              this.onTouchCancel$delegate = new _.com.github.andrewoma.react.Property();
              this.onTouchEnd$delegate = new _.com.github.andrewoma.react.Property();
              this.onTouchMove$delegate = new _.com.github.andrewoma.react.Property();
              this.onTouchStart$delegate = new _.com.github.andrewoma.react.Property();
              this.onScroll$delegate = new _.com.github.andrewoma.react.Property();
              this.onWheel$delegate = new _.com.github.andrewoma.react.Property();
            }, /** @lends _.com.github.andrewoma.react.ReactProperties.prototype */ {
              key: {
                get: function () {
                  return this.key$delegate.getValue_dsk1ci$(this, new Kotlin.PropertyMetadata('key'));
                },
                set: function (key) {
                  this.key$delegate.setValue_w32e13$(this, new Kotlin.PropertyMetadata('key'), key);
                }
              },
              ref: {
                get: function () {
                  return this.ref$delegate.getValue_dsk1ci$(this, new Kotlin.PropertyMetadata('ref'));
                },
                set: function (ref) {
                  this.ref$delegate.setValue_w32e13$(this, new Kotlin.PropertyMetadata('ref'), ref);
                }
              },
              onCopy: {
                get: function () {
                  return this.onCopy$delegate.getValue_dsk1ci$(this, new Kotlin.PropertyMetadata('onCopy'));
                },
                set: function (onCopy) {
                  this.onCopy$delegate.setValue_w32e13$(this, new Kotlin.PropertyMetadata('onCopy'), onCopy);
                }
              },
              onCut: {
                get: function () {
                  return this.onCut$delegate.getValue_dsk1ci$(this, new Kotlin.PropertyMetadata('onCut'));
                },
                set: function (onCut) {
                  this.onCut$delegate.setValue_w32e13$(this, new Kotlin.PropertyMetadata('onCut'), onCut);
                }
              },
              onPaste: {
                get: function () {
                  return this.onPaste$delegate.getValue_dsk1ci$(this, new Kotlin.PropertyMetadata('onPaste'));
                },
                set: function (onPaste) {
                  this.onPaste$delegate.setValue_w32e13$(this, new Kotlin.PropertyMetadata('onPaste'), onPaste);
                }
              },
              onKeyDown: {
                get: function () {
                  return this.onKeyDown$delegate.getValue_dsk1ci$(this, new Kotlin.PropertyMetadata('onKeyDown'));
                },
                set: function (onKeyDown) {
                  this.onKeyDown$delegate.setValue_w32e13$(this, new Kotlin.PropertyMetadata('onKeyDown'), onKeyDown);
                }
              },
              onKeyPress: {
                get: function () {
                  return this.onKeyPress$delegate.getValue_dsk1ci$(this, new Kotlin.PropertyMetadata('onKeyPress'));
                },
                set: function (onKeyPress) {
                  this.onKeyPress$delegate.setValue_w32e13$(this, new Kotlin.PropertyMetadata('onKeyPress'), onKeyPress);
                }
              },
              onKeyUp: {
                get: function () {
                  return this.onKeyUp$delegate.getValue_dsk1ci$(this, new Kotlin.PropertyMetadata('onKeyUp'));
                },
                set: function (onKeyUp) {
                  this.onKeyUp$delegate.setValue_w32e13$(this, new Kotlin.PropertyMetadata('onKeyUp'), onKeyUp);
                }
              },
              onFocus: {
                get: function () {
                  return this.onFocus$delegate.getValue_dsk1ci$(this, new Kotlin.PropertyMetadata('onFocus'));
                },
                set: function (onFocus) {
                  this.onFocus$delegate.setValue_w32e13$(this, new Kotlin.PropertyMetadata('onFocus'), onFocus);
                }
              },
              onBlur: {
                get: function () {
                  return this.onBlur$delegate.getValue_dsk1ci$(this, new Kotlin.PropertyMetadata('onBlur'));
                },
                set: function (onBlur) {
                  this.onBlur$delegate.setValue_w32e13$(this, new Kotlin.PropertyMetadata('onBlur'), onBlur);
                }
              },
              onChange: {
                get: function () {
                  return this.onChange$delegate.getValue_dsk1ci$(this, new Kotlin.PropertyMetadata('onChange'));
                },
                set: function (onChange) {
                  this.onChange$delegate.setValue_w32e13$(this, new Kotlin.PropertyMetadata('onChange'), onChange);
                }
              },
              onInput: {
                get: function () {
                  return this.onInput$delegate.getValue_dsk1ci$(this, new Kotlin.PropertyMetadata('onInput'));
                },
                set: function (onInput) {
                  this.onInput$delegate.setValue_w32e13$(this, new Kotlin.PropertyMetadata('onInput'), onInput);
                }
              },
              onSubmit: {
                get: function () {
                  return this.onSubmit$delegate.getValue_dsk1ci$(this, new Kotlin.PropertyMetadata('onSubmit'));
                },
                set: function (onSubmit) {
                  this.onSubmit$delegate.setValue_w32e13$(this, new Kotlin.PropertyMetadata('onSubmit'), onSubmit);
                }
              },
              onClick: {
                get: function () {
                  return this.onClick$delegate.getValue_dsk1ci$(this, new Kotlin.PropertyMetadata('onClick'));
                },
                set: function (onClick) {
                  this.onClick$delegate.setValue_w32e13$(this, new Kotlin.PropertyMetadata('onClick'), onClick);
                }
              },
              onDoubleClick: {
                get: function () {
                  return this.onDoubleClick$delegate.getValue_dsk1ci$(this, new Kotlin.PropertyMetadata('onDoubleClick'));
                },
                set: function (onDoubleClick) {
                  this.onDoubleClick$delegate.setValue_w32e13$(this, new Kotlin.PropertyMetadata('onDoubleClick'), onDoubleClick);
                }
              },
              onDrag: {
                get: function () {
                  return this.onDrag$delegate.getValue_dsk1ci$(this, new Kotlin.PropertyMetadata('onDrag'));
                },
                set: function (onDrag) {
                  this.onDrag$delegate.setValue_w32e13$(this, new Kotlin.PropertyMetadata('onDrag'), onDrag);
                }
              },
              onDragEnd: {
                get: function () {
                  return this.onDragEnd$delegate.getValue_dsk1ci$(this, new Kotlin.PropertyMetadata('onDragEnd'));
                },
                set: function (onDragEnd) {
                  this.onDragEnd$delegate.setValue_w32e13$(this, new Kotlin.PropertyMetadata('onDragEnd'), onDragEnd);
                }
              },
              onDragEnter: {
                get: function () {
                  return this.onDragEnter$delegate.getValue_dsk1ci$(this, new Kotlin.PropertyMetadata('onDragEnter'));
                },
                set: function (onDragEnter) {
                  this.onDragEnter$delegate.setValue_w32e13$(this, new Kotlin.PropertyMetadata('onDragEnter'), onDragEnter);
                }
              },
              onDragExit: {
                get: function () {
                  return this.onDragExit$delegate.getValue_dsk1ci$(this, new Kotlin.PropertyMetadata('onDragExit'));
                },
                set: function (onDragExit) {
                  this.onDragExit$delegate.setValue_w32e13$(this, new Kotlin.PropertyMetadata('onDragExit'), onDragExit);
                }
              },
              onDragLeave: {
                get: function () {
                  return this.onDragLeave$delegate.getValue_dsk1ci$(this, new Kotlin.PropertyMetadata('onDragLeave'));
                },
                set: function (onDragLeave) {
                  this.onDragLeave$delegate.setValue_w32e13$(this, new Kotlin.PropertyMetadata('onDragLeave'), onDragLeave);
                }
              },
              onDragOver: {
                get: function () {
                  return this.onDragOver$delegate.getValue_dsk1ci$(this, new Kotlin.PropertyMetadata('onDragOver'));
                },
                set: function (onDragOver) {
                  this.onDragOver$delegate.setValue_w32e13$(this, new Kotlin.PropertyMetadata('onDragOver'), onDragOver);
                }
              },
              onDragStart: {
                get: function () {
                  return this.onDragStart$delegate.getValue_dsk1ci$(this, new Kotlin.PropertyMetadata('onDragStart'));
                },
                set: function (onDragStart) {
                  this.onDragStart$delegate.setValue_w32e13$(this, new Kotlin.PropertyMetadata('onDragStart'), onDragStart);
                }
              },
              onDrop: {
                get: function () {
                  return this.onDrop$delegate.getValue_dsk1ci$(this, new Kotlin.PropertyMetadata('onDrop'));
                },
                set: function (onDrop) {
                  this.onDrop$delegate.setValue_w32e13$(this, new Kotlin.PropertyMetadata('onDrop'), onDrop);
                }
              },
              onMouseDown: {
                get: function () {
                  return this.onMouseDown$delegate.getValue_dsk1ci$(this, new Kotlin.PropertyMetadata('onMouseDown'));
                },
                set: function (onMouseDown) {
                  this.onMouseDown$delegate.setValue_w32e13$(this, new Kotlin.PropertyMetadata('onMouseDown'), onMouseDown);
                }
              },
              onMouseEnter: {
                get: function () {
                  return this.onMouseEnter$delegate.getValue_dsk1ci$(this, new Kotlin.PropertyMetadata('onMouseEnter'));
                },
                set: function (onMouseEnter) {
                  this.onMouseEnter$delegate.setValue_w32e13$(this, new Kotlin.PropertyMetadata('onMouseEnter'), onMouseEnter);
                }
              },
              onMouseLeave: {
                get: function () {
                  return this.onMouseLeave$delegate.getValue_dsk1ci$(this, new Kotlin.PropertyMetadata('onMouseLeave'));
                },
                set: function (onMouseLeave) {
                  this.onMouseLeave$delegate.setValue_w32e13$(this, new Kotlin.PropertyMetadata('onMouseLeave'), onMouseLeave);
                }
              },
              onMouseMove: {
                get: function () {
                  return this.onMouseMove$delegate.getValue_dsk1ci$(this, new Kotlin.PropertyMetadata('onMouseMove'));
                },
                set: function (onMouseMove) {
                  this.onMouseMove$delegate.setValue_w32e13$(this, new Kotlin.PropertyMetadata('onMouseMove'), onMouseMove);
                }
              },
              onMouseUp: {
                get: function () {
                  return this.onMouseUp$delegate.getValue_dsk1ci$(this, new Kotlin.PropertyMetadata('onMouseUp'));
                },
                set: function (onMouseUp) {
                  this.onMouseUp$delegate.setValue_w32e13$(this, new Kotlin.PropertyMetadata('onMouseUp'), onMouseUp);
                }
              },
              onTouchCancel: {
                get: function () {
                  return this.onTouchCancel$delegate.getValue_dsk1ci$(this, new Kotlin.PropertyMetadata('onTouchCancel'));
                },
                set: function (onTouchCancel) {
                  this.onTouchCancel$delegate.setValue_w32e13$(this, new Kotlin.PropertyMetadata('onTouchCancel'), onTouchCancel);
                }
              },
              onTouchEnd: {
                get: function () {
                  return this.onTouchEnd$delegate.getValue_dsk1ci$(this, new Kotlin.PropertyMetadata('onTouchEnd'));
                },
                set: function (onTouchEnd) {
                  this.onTouchEnd$delegate.setValue_w32e13$(this, new Kotlin.PropertyMetadata('onTouchEnd'), onTouchEnd);
                }
              },
              onTouchMove: {
                get: function () {
                  return this.onTouchMove$delegate.getValue_dsk1ci$(this, new Kotlin.PropertyMetadata('onTouchMove'));
                },
                set: function (onTouchMove) {
                  this.onTouchMove$delegate.setValue_w32e13$(this, new Kotlin.PropertyMetadata('onTouchMove'), onTouchMove);
                }
              },
              onTouchStart: {
                get: function () {
                  return this.onTouchStart$delegate.getValue_dsk1ci$(this, new Kotlin.PropertyMetadata('onTouchStart'));
                },
                set: function (onTouchStart) {
                  this.onTouchStart$delegate.setValue_w32e13$(this, new Kotlin.PropertyMetadata('onTouchStart'), onTouchStart);
                }
              },
              onScroll: {
                get: function () {
                  return this.onScroll$delegate.getValue_dsk1ci$(this, new Kotlin.PropertyMetadata('onScroll'));
                },
                set: function (onScroll) {
                  this.onScroll$delegate.setValue_w32e13$(this, new Kotlin.PropertyMetadata('onScroll'), onScroll);
                }
              },
              onWheel: {
                get: function () {
                  return this.onWheel$delegate.getValue_dsk1ci$(this, new Kotlin.PropertyMetadata('onWheel'));
                },
                set: function (onWheel) {
                  this.onWheel$delegate.setValue_w32e13$(this, new Kotlin.PropertyMetadata('onWheel'), onWheel);
                }
              }
            }),
            HtmlGlobalProperties: Kotlin.createClass(function () {
              return [_.com.github.andrewoma.react.ReactProperties];
            }, function $fun() {
              $fun.baseInitializer.call(this);
              this.key$delegate = new _.com.github.andrewoma.react.Property();
              this.accessKey$delegate = new _.com.github.andrewoma.react.Property();
              this.className$delegate = new _.com.github.andrewoma.react.Property();
              this.contentEditable$delegate = new _.com.github.andrewoma.react.Property();
              this.contextMenu$delegate = new _.com.github.andrewoma.react.Property();
              this.dir$delegate = new _.com.github.andrewoma.react.Property();
              this.draggable$delegate = new _.com.github.andrewoma.react.Property();
              this.hidden$delegate = new _.com.github.andrewoma.react.Property();
              this.id$delegate = new _.com.github.andrewoma.react.Property();
              this.lang$delegate = new _.com.github.andrewoma.react.Property();
              this.spellCheck$delegate = new _.com.github.andrewoma.react.Property();
              this.role$delegate = new _.com.github.andrewoma.react.Property();
              this.scrollLeft$delegate = new _.com.github.andrewoma.react.Property();
              this.scrollTop$delegate = new _.com.github.andrewoma.react.Property();
              this.style$delegate = new _.com.github.andrewoma.react.Property();
            }, /** @lends _.com.github.andrewoma.react.HtmlGlobalProperties.prototype */ {
              key: {
                get: function () {
                  return this.key$delegate.getValue_dsk1ci$(this, new Kotlin.PropertyMetadata('key'));
                },
                set: function (key) {
                  this.key$delegate.setValue_w32e13$(this, new Kotlin.PropertyMetadata('key'), key);
                }
              },
              accessKey: {
                get: function () {
                  return this.accessKey$delegate.getValue_dsk1ci$(this, new Kotlin.PropertyMetadata('accessKey'));
                },
                set: function (accessKey) {
                  this.accessKey$delegate.setValue_w32e13$(this, new Kotlin.PropertyMetadata('accessKey'), accessKey);
                }
              },
              className: {
                get: function () {
                  return this.className$delegate.getValue_dsk1ci$(this, new Kotlin.PropertyMetadata('className'));
                },
                set: function (className) {
                  this.className$delegate.setValue_w32e13$(this, new Kotlin.PropertyMetadata('className'), className);
                }
              },
              contentEditable: {
                get: function () {
                  return this.contentEditable$delegate.getValue_dsk1ci$(this, new Kotlin.PropertyMetadata('contentEditable'));
                },
                set: function (contentEditable) {
                  this.contentEditable$delegate.setValue_w32e13$(this, new Kotlin.PropertyMetadata('contentEditable'), contentEditable);
                }
              },
              contextMenu: {
                get: function () {
                  return this.contextMenu$delegate.getValue_dsk1ci$(this, new Kotlin.PropertyMetadata('contextMenu'));
                },
                set: function (contextMenu) {
                  this.contextMenu$delegate.setValue_w32e13$(this, new Kotlin.PropertyMetadata('contextMenu'), contextMenu);
                }
              },
              dir: {
                get: function () {
                  return this.dir$delegate.getValue_dsk1ci$(this, new Kotlin.PropertyMetadata('dir'));
                },
                set: function (dir) {
                  this.dir$delegate.setValue_w32e13$(this, new Kotlin.PropertyMetadata('dir'), dir);
                }
              },
              draggable: {
                get: function () {
                  return this.draggable$delegate.getValue_dsk1ci$(this, new Kotlin.PropertyMetadata('draggable'));
                },
                set: function (draggable) {
                  this.draggable$delegate.setValue_w32e13$(this, new Kotlin.PropertyMetadata('draggable'), draggable);
                }
              },
              hidden: {
                get: function () {
                  return this.hidden$delegate.getValue_dsk1ci$(this, new Kotlin.PropertyMetadata('hidden'));
                },
                set: function (hidden) {
                  this.hidden$delegate.setValue_w32e13$(this, new Kotlin.PropertyMetadata('hidden'), hidden);
                }
              },
              id: {
                get: function () {
                  return this.id$delegate.getValue_dsk1ci$(this, new Kotlin.PropertyMetadata('id'));
                },
                set: function (id) {
                  this.id$delegate.setValue_w32e13$(this, new Kotlin.PropertyMetadata('id'), id);
                }
              },
              lang: {
                get: function () {
                  return this.lang$delegate.getValue_dsk1ci$(this, new Kotlin.PropertyMetadata('lang'));
                },
                set: function (lang) {
                  this.lang$delegate.setValue_w32e13$(this, new Kotlin.PropertyMetadata('lang'), lang);
                }
              },
              spellCheck: {
                get: function () {
                  return this.spellCheck$delegate.getValue_dsk1ci$(this, new Kotlin.PropertyMetadata('spellCheck'));
                },
                set: function (spellCheck) {
                  this.spellCheck$delegate.setValue_w32e13$(this, new Kotlin.PropertyMetadata('spellCheck'), spellCheck);
                }
              },
              role: {
                get: function () {
                  return this.role$delegate.getValue_dsk1ci$(this, new Kotlin.PropertyMetadata('role'));
                },
                set: function (role) {
                  this.role$delegate.setValue_w32e13$(this, new Kotlin.PropertyMetadata('role'), role);
                }
              },
              scrollLeft: {
                get: function () {
                  return this.scrollLeft$delegate.getValue_dsk1ci$(this, new Kotlin.PropertyMetadata('scrollLeft'));
                },
                set: function (scrollLeft) {
                  this.scrollLeft$delegate.setValue_w32e13$(this, new Kotlin.PropertyMetadata('scrollLeft'), scrollLeft);
                }
              },
              scrollTop: {
                get: function () {
                  return this.scrollTop$delegate.getValue_dsk1ci$(this, new Kotlin.PropertyMetadata('scrollTop'));
                },
                set: function (scrollTop) {
                  this.scrollTop$delegate.setValue_w32e13$(this, new Kotlin.PropertyMetadata('scrollTop'), scrollTop);
                }
              },
              style: {
                get: function () {
                  return this.style$delegate.getValue_dsk1ci$(this, new Kotlin.PropertyMetadata('style'));
                },
                set: function (style) {
                  this.style$delegate.setValue_w32e13$(this, new Kotlin.PropertyMetadata('style'), style);
                }
              }
            }),
            FormProperties: Kotlin.createClass(function () {
              return [_.com.github.andrewoma.react.HtmlGlobalProperties];
            }, function $fun() {
              $fun.baseInitializer.call(this);
              this.accept$delegate = new _.com.github.andrewoma.react.Property();
              this.action$delegate = new _.com.github.andrewoma.react.Property();
              this.autoCapitalize$delegate = new _.com.github.andrewoma.react.Property();
              this.autoComplete$delegate = new _.com.github.andrewoma.react.Property();
              this.encType$delegate = new _.com.github.andrewoma.react.Property();
              this.method$delegate = new _.com.github.andrewoma.react.Property();
              this.name$delegate = new _.com.github.andrewoma.react.Property();
              this.target$delegate = new _.com.github.andrewoma.react.Property();
            }, /** @lends _.com.github.andrewoma.react.FormProperties.prototype */ {
              accept: {
                get: function () {
                  return this.accept$delegate.getValue_dsk1ci$(this, new Kotlin.PropertyMetadata('accept'));
                },
                set: function (accept) {
                  this.accept$delegate.setValue_w32e13$(this, new Kotlin.PropertyMetadata('accept'), accept);
                }
              },
              action: {
                get: function () {
                  return this.action$delegate.getValue_dsk1ci$(this, new Kotlin.PropertyMetadata('action'));
                },
                set: function (action) {
                  this.action$delegate.setValue_w32e13$(this, new Kotlin.PropertyMetadata('action'), action);
                }
              },
              autoCapitalize: {
                get: function () {
                  return this.autoCapitalize$delegate.getValue_dsk1ci$(this, new Kotlin.PropertyMetadata('autoCapitalize'));
                },
                set: function (autoCapitalize) {
                  this.autoCapitalize$delegate.setValue_w32e13$(this, new Kotlin.PropertyMetadata('autoCapitalize'), autoCapitalize);
                }
              },
              autoComplete: {
                get: function () {
                  return this.autoComplete$delegate.getValue_dsk1ci$(this, new Kotlin.PropertyMetadata('autoComplete'));
                },
                set: function (autoComplete) {
                  this.autoComplete$delegate.setValue_w32e13$(this, new Kotlin.PropertyMetadata('autoComplete'), autoComplete);
                }
              },
              encType: {
                get: function () {
                  return this.encType$delegate.getValue_dsk1ci$(this, new Kotlin.PropertyMetadata('encType'));
                },
                set: function (encType) {
                  this.encType$delegate.setValue_w32e13$(this, new Kotlin.PropertyMetadata('encType'), encType);
                }
              },
              method: {
                get: function () {
                  return this.method$delegate.getValue_dsk1ci$(this, new Kotlin.PropertyMetadata('method'));
                },
                set: function (method) {
                  this.method$delegate.setValue_w32e13$(this, new Kotlin.PropertyMetadata('method'), method);
                }
              },
              name: {
                get: function () {
                  return this.name$delegate.getValue_dsk1ci$(this, new Kotlin.PropertyMetadata('name'));
                },
                set: function (name) {
                  this.name$delegate.setValue_w32e13$(this, new Kotlin.PropertyMetadata('name'), name);
                }
              },
              target: {
                get: function () {
                  return this.target$delegate.getValue_dsk1ci$(this, new Kotlin.PropertyMetadata('target'));
                },
                set: function (target) {
                  this.target$delegate.setValue_w32e13$(this, new Kotlin.PropertyMetadata('target'), target);
                }
              }
            }),
            InputProperties: Kotlin.createClass(function () {
              return [_.com.github.andrewoma.react.HtmlGlobalProperties];
            }, function $fun() {
              $fun.baseInitializer.call(this);
              this.accept$delegate = new _.com.github.andrewoma.react.Property();
              this.alt$delegate = new _.com.github.andrewoma.react.Property();
              this.autoCapitalize$delegate = new _.com.github.andrewoma.react.Property();
              this.autoComplete$delegate = new _.com.github.andrewoma.react.Property();
              this.autoFocus$delegate = new _.com.github.andrewoma.react.Property();
              this.checked$delegate = new _.com.github.andrewoma.react.Property();
              this.defaultValue$delegate = new _.com.github.andrewoma.react.Property();
              this.disabled$delegate = new _.com.github.andrewoma.react.Property();
              this.form$delegate = new _.com.github.andrewoma.react.Property();
              this.height$delegate = new _.com.github.andrewoma.react.Property();
              this.list$delegate = new _.com.github.andrewoma.react.Property();
              this.max$delegate = new _.com.github.andrewoma.react.Property();
              this.maxLength$delegate = new _.com.github.andrewoma.react.Property();
              this.min$delegate = new _.com.github.andrewoma.react.Property();
              this.multiple$delegate = new _.com.github.andrewoma.react.Property();
              this.name$delegate = new _.com.github.andrewoma.react.Property();
              this.pattern$delegate = new _.com.github.andrewoma.react.Property();
              this.placeholder$delegate = new _.com.github.andrewoma.react.Property();
              this.readOnly$delegate = new _.com.github.andrewoma.react.Property();
              this.required$delegate = new _.com.github.andrewoma.react.Property();
              this.size$delegate = new _.com.github.andrewoma.react.Property();
              this.src$delegate = new _.com.github.andrewoma.react.Property();
              this.step$delegate = new _.com.github.andrewoma.react.Property();
              this.type$delegate = new _.com.github.andrewoma.react.Property();
              this.value$delegate = new _.com.github.andrewoma.react.Property();
              this.width$delegate = new _.com.github.andrewoma.react.Property();
              this.formAction$delegate = new _.com.github.andrewoma.react.Property();
              this.formEncType$delegate = new _.com.github.andrewoma.react.Property();
              this.formMethod$delegate = new _.com.github.andrewoma.react.Property();
              this.formTarget$delegate = new _.com.github.andrewoma.react.Property();
            }, /** @lends _.com.github.andrewoma.react.InputProperties.prototype */ {
              accept: {
                get: function () {
                  return this.accept$delegate.getValue_dsk1ci$(this, new Kotlin.PropertyMetadata('accept'));
                },
                set: function (accept) {
                  this.accept$delegate.setValue_w32e13$(this, new Kotlin.PropertyMetadata('accept'), accept);
                }
              },
              alt: {
                get: function () {
                  return this.alt$delegate.getValue_dsk1ci$(this, new Kotlin.PropertyMetadata('alt'));
                },
                set: function (alt) {
                  this.alt$delegate.setValue_w32e13$(this, new Kotlin.PropertyMetadata('alt'), alt);
                }
              },
              autoCapitalize: {
                get: function () {
                  return this.autoCapitalize$delegate.getValue_dsk1ci$(this, new Kotlin.PropertyMetadata('autoCapitalize'));
                },
                set: function (autoCapitalize) {
                  this.autoCapitalize$delegate.setValue_w32e13$(this, new Kotlin.PropertyMetadata('autoCapitalize'), autoCapitalize);
                }
              },
              autoComplete: {
                get: function () {
                  return this.autoComplete$delegate.getValue_dsk1ci$(this, new Kotlin.PropertyMetadata('autoComplete'));
                },
                set: function (autoComplete) {
                  this.autoComplete$delegate.setValue_w32e13$(this, new Kotlin.PropertyMetadata('autoComplete'), autoComplete);
                }
              },
              autoFocus: {
                get: function () {
                  return this.autoFocus$delegate.getValue_dsk1ci$(this, new Kotlin.PropertyMetadata('autoFocus'));
                },
                set: function (autoFocus) {
                  this.autoFocus$delegate.setValue_w32e13$(this, new Kotlin.PropertyMetadata('autoFocus'), autoFocus);
                }
              },
              checked: {
                get: function () {
                  return this.checked$delegate.getValue_dsk1ci$(this, new Kotlin.PropertyMetadata('checked'));
                },
                set: function (checked) {
                  this.checked$delegate.setValue_w32e13$(this, new Kotlin.PropertyMetadata('checked'), checked);
                }
              },
              defaultValue: {
                get: function () {
                  return this.defaultValue$delegate.getValue_dsk1ci$(this, new Kotlin.PropertyMetadata('defaultValue'));
                },
                set: function (defaultValue) {
                  this.defaultValue$delegate.setValue_w32e13$(this, new Kotlin.PropertyMetadata('defaultValue'), defaultValue);
                }
              },
              disabled: {
                get: function () {
                  return this.disabled$delegate.getValue_dsk1ci$(this, new Kotlin.PropertyMetadata('disabled'));
                },
                set: function (disabled) {
                  this.disabled$delegate.setValue_w32e13$(this, new Kotlin.PropertyMetadata('disabled'), disabled);
                }
              },
              form: {
                get: function () {
                  return this.form$delegate.getValue_dsk1ci$(this, new Kotlin.PropertyMetadata('form'));
                },
                set: function (form) {
                  this.form$delegate.setValue_w32e13$(this, new Kotlin.PropertyMetadata('form'), form);
                }
              },
              height: {
                get: function () {
                  return this.height$delegate.getValue_dsk1ci$(this, new Kotlin.PropertyMetadata('height'));
                },
                set: function (height) {
                  this.height$delegate.setValue_w32e13$(this, new Kotlin.PropertyMetadata('height'), height);
                }
              },
              list: {
                get: function () {
                  return this.list$delegate.getValue_dsk1ci$(this, new Kotlin.PropertyMetadata('list'));
                },
                set: function (list) {
                  this.list$delegate.setValue_w32e13$(this, new Kotlin.PropertyMetadata('list'), list);
                }
              },
              max: {
                get: function () {
                  return this.max$delegate.getValue_dsk1ci$(this, new Kotlin.PropertyMetadata('max'));
                },
                set: function (max) {
                  this.max$delegate.setValue_w32e13$(this, new Kotlin.PropertyMetadata('max'), max);
                }
              },
              maxLength: {
                get: function () {
                  return this.maxLength$delegate.getValue_dsk1ci$(this, new Kotlin.PropertyMetadata('maxLength'));
                },
                set: function (maxLength) {
                  this.maxLength$delegate.setValue_w32e13$(this, new Kotlin.PropertyMetadata('maxLength'), maxLength);
                }
              },
              min: {
                get: function () {
                  return this.min$delegate.getValue_dsk1ci$(this, new Kotlin.PropertyMetadata('min'));
                },
                set: function (min) {
                  this.min$delegate.setValue_w32e13$(this, new Kotlin.PropertyMetadata('min'), min);
                }
              },
              multiple: {
                get: function () {
                  return this.multiple$delegate.getValue_dsk1ci$(this, new Kotlin.PropertyMetadata('multiple'));
                },
                set: function (multiple) {
                  this.multiple$delegate.setValue_w32e13$(this, new Kotlin.PropertyMetadata('multiple'), multiple);
                }
              },
              name: {
                get: function () {
                  return this.name$delegate.getValue_dsk1ci$(this, new Kotlin.PropertyMetadata('name'));
                },
                set: function (name) {
                  this.name$delegate.setValue_w32e13$(this, new Kotlin.PropertyMetadata('name'), name);
                }
              },
              pattern: {
                get: function () {
                  return this.pattern$delegate.getValue_dsk1ci$(this, new Kotlin.PropertyMetadata('pattern'));
                },
                set: function (pattern) {
                  this.pattern$delegate.setValue_w32e13$(this, new Kotlin.PropertyMetadata('pattern'), pattern);
                }
              },
              placeholder: {
                get: function () {
                  return this.placeholder$delegate.getValue_dsk1ci$(this, new Kotlin.PropertyMetadata('placeholder'));
                },
                set: function (placeholder) {
                  this.placeholder$delegate.setValue_w32e13$(this, new Kotlin.PropertyMetadata('placeholder'), placeholder);
                }
              },
              readOnly: {
                get: function () {
                  return this.readOnly$delegate.getValue_dsk1ci$(this, new Kotlin.PropertyMetadata('readOnly'));
                },
                set: function (readOnly) {
                  this.readOnly$delegate.setValue_w32e13$(this, new Kotlin.PropertyMetadata('readOnly'), readOnly);
                }
              },
              required: {
                get: function () {
                  return this.required$delegate.getValue_dsk1ci$(this, new Kotlin.PropertyMetadata('required'));
                },
                set: function (required) {
                  this.required$delegate.setValue_w32e13$(this, new Kotlin.PropertyMetadata('required'), required);
                }
              },
              size: {
                get: function () {
                  return this.size$delegate.getValue_dsk1ci$(this, new Kotlin.PropertyMetadata('size'));
                },
                set: function (size) {
                  this.size$delegate.setValue_w32e13$(this, new Kotlin.PropertyMetadata('size'), size);
                }
              },
              src: {
                get: function () {
                  return this.src$delegate.getValue_dsk1ci$(this, new Kotlin.PropertyMetadata('src'));
                },
                set: function (src) {
                  this.src$delegate.setValue_w32e13$(this, new Kotlin.PropertyMetadata('src'), src);
                }
              },
              step: {
                get: function () {
                  return this.step$delegate.getValue_dsk1ci$(this, new Kotlin.PropertyMetadata('step'));
                },
                set: function (step) {
                  this.step$delegate.setValue_w32e13$(this, new Kotlin.PropertyMetadata('step'), step);
                }
              },
              type: {
                get: function () {
                  return this.type$delegate.getValue_dsk1ci$(this, new Kotlin.PropertyMetadata('type'));
                },
                set: function (type) {
                  this.type$delegate.setValue_w32e13$(this, new Kotlin.PropertyMetadata('type'), type);
                }
              },
              value: {
                get: function () {
                  return this.value$delegate.getValue_dsk1ci$(this, new Kotlin.PropertyMetadata('value'));
                },
                set: function (value) {
                  this.value$delegate.setValue_w32e13$(this, new Kotlin.PropertyMetadata('value'), value);
                }
              },
              width: {
                get: function () {
                  return this.width$delegate.getValue_dsk1ci$(this, new Kotlin.PropertyMetadata('width'));
                },
                set: function (width) {
                  this.width$delegate.setValue_w32e13$(this, new Kotlin.PropertyMetadata('width'), width);
                }
              },
              formAction: {
                get: function () {
                  return this.formAction$delegate.getValue_dsk1ci$(this, new Kotlin.PropertyMetadata('formAction'));
                },
                set: function (formAction) {
                  this.formAction$delegate.setValue_w32e13$(this, new Kotlin.PropertyMetadata('formAction'), formAction);
                }
              },
              formEncType: {
                get: function () {
                  return this.formEncType$delegate.getValue_dsk1ci$(this, new Kotlin.PropertyMetadata('formEncType'));
                },
                set: function (formEncType) {
                  this.formEncType$delegate.setValue_w32e13$(this, new Kotlin.PropertyMetadata('formEncType'), formEncType);
                }
              },
              formMethod: {
                get: function () {
                  return this.formMethod$delegate.getValue_dsk1ci$(this, new Kotlin.PropertyMetadata('formMethod'));
                },
                set: function (formMethod) {
                  this.formMethod$delegate.setValue_w32e13$(this, new Kotlin.PropertyMetadata('formMethod'), formMethod);
                }
              },
              formTarget: {
                get: function () {
                  return this.formTarget$delegate.getValue_dsk1ci$(this, new Kotlin.PropertyMetadata('formTarget'));
                },
                set: function (formTarget) {
                  this.formTarget$delegate.setValue_w32e13$(this, new Kotlin.PropertyMetadata('formTarget'), formTarget);
                }
              }
            }),
            IframeProperties: Kotlin.createClass(function () {
              return [_.com.github.andrewoma.react.HtmlGlobalProperties];
            }, function $fun() {
              $fun.baseInitializer.call(this);
              this.allowFullScreen$delegate = new _.com.github.andrewoma.react.Property();
              this.allowTransparency$delegate = new _.com.github.andrewoma.react.Property();
              this.frameBorder$delegate = new _.com.github.andrewoma.react.Property();
              this.height$delegate = new _.com.github.andrewoma.react.Property();
              this.name$delegate = new _.com.github.andrewoma.react.Property();
              this.src$delegate = new _.com.github.andrewoma.react.Property();
              this.width$delegate = new _.com.github.andrewoma.react.Property();
              this.marginHeight$delegate = new _.com.github.andrewoma.react.Property();
              this.marginWidth$delegate = new _.com.github.andrewoma.react.Property();
            }, /** @lends _.com.github.andrewoma.react.IframeProperties.prototype */ {
              allowFullScreen: {
                get: function () {
                  return this.allowFullScreen$delegate.getValue_dsk1ci$(this, new Kotlin.PropertyMetadata('allowFullScreen'));
                },
                set: function (allowFullScreen) {
                  this.allowFullScreen$delegate.setValue_w32e13$(this, new Kotlin.PropertyMetadata('allowFullScreen'), allowFullScreen);
                }
              },
              allowTransparency: {
                get: function () {
                  return this.allowTransparency$delegate.getValue_dsk1ci$(this, new Kotlin.PropertyMetadata('allowTransparency'));
                },
                set: function (allowTransparency) {
                  this.allowTransparency$delegate.setValue_w32e13$(this, new Kotlin.PropertyMetadata('allowTransparency'), allowTransparency);
                }
              },
              frameBorder: {
                get: function () {
                  return this.frameBorder$delegate.getValue_dsk1ci$(this, new Kotlin.PropertyMetadata('frameBorder'));
                },
                set: function (frameBorder) {
                  this.frameBorder$delegate.setValue_w32e13$(this, new Kotlin.PropertyMetadata('frameBorder'), frameBorder);
                }
              },
              height: {
                get: function () {
                  return this.height$delegate.getValue_dsk1ci$(this, new Kotlin.PropertyMetadata('height'));
                },
                set: function (height) {
                  this.height$delegate.setValue_w32e13$(this, new Kotlin.PropertyMetadata('height'), height);
                }
              },
              name: {
                get: function () {
                  return this.name$delegate.getValue_dsk1ci$(this, new Kotlin.PropertyMetadata('name'));
                },
                set: function (name) {
                  this.name$delegate.setValue_w32e13$(this, new Kotlin.PropertyMetadata('name'), name);
                }
              },
              src: {
                get: function () {
                  return this.src$delegate.getValue_dsk1ci$(this, new Kotlin.PropertyMetadata('src'));
                },
                set: function (src) {
                  this.src$delegate.setValue_w32e13$(this, new Kotlin.PropertyMetadata('src'), src);
                }
              },
              width: {
                get: function () {
                  return this.width$delegate.getValue_dsk1ci$(this, new Kotlin.PropertyMetadata('width'));
                },
                set: function (width) {
                  this.width$delegate.setValue_w32e13$(this, new Kotlin.PropertyMetadata('width'), width);
                }
              },
              marginHeight: {
                get: function () {
                  return this.marginHeight$delegate.getValue_dsk1ci$(this, new Kotlin.PropertyMetadata('marginHeight'));
                },
                set: function (marginHeight) {
                  this.marginHeight$delegate.setValue_w32e13$(this, new Kotlin.PropertyMetadata('marginHeight'), marginHeight);
                }
              },
              marginWidth: {
                get: function () {
                  return this.marginWidth$delegate.getValue_dsk1ci$(this, new Kotlin.PropertyMetadata('marginWidth'));
                },
                set: function (marginWidth) {
                  this.marginWidth$delegate.setValue_w32e13$(this, new Kotlin.PropertyMetadata('marginWidth'), marginWidth);
                }
              }
            }),
            AppletProperties: Kotlin.createClass(function () {
              return [_.com.github.andrewoma.react.HtmlGlobalProperties];
            }, function $fun() {
              $fun.baseInitializer.call(this);
              this.alt$delegate = new _.com.github.andrewoma.react.Property();
            }, /** @lends _.com.github.andrewoma.react.AppletProperties.prototype */ {
              alt: {
                get: function () {
                  return this.alt$delegate.getValue_dsk1ci$(this, new Kotlin.PropertyMetadata('alt'));
                },
                set: function (alt) {
                  this.alt$delegate.setValue_w32e13$(this, new Kotlin.PropertyMetadata('alt'), alt);
                }
              }
            }),
            AreaProperties: Kotlin.createClass(function () {
              return [_.com.github.andrewoma.react.HtmlGlobalProperties];
            }, function $fun() {
              $fun.baseInitializer.call(this);
              this.alt$delegate = new _.com.github.andrewoma.react.Property();
              this.href$delegate = new _.com.github.andrewoma.react.Property();
              this.rel$delegate = new _.com.github.andrewoma.react.Property();
              this.target$delegate = new _.com.github.andrewoma.react.Property();
            }, /** @lends _.com.github.andrewoma.react.AreaProperties.prototype */ {
              alt: {
                get: function () {
                  return this.alt$delegate.getValue_dsk1ci$(this, new Kotlin.PropertyMetadata('alt'));
                },
                set: function (alt) {
                  this.alt$delegate.setValue_w32e13$(this, new Kotlin.PropertyMetadata('alt'), alt);
                }
              },
              href: {
                get: function () {
                  return this.href$delegate.getValue_dsk1ci$(this, new Kotlin.PropertyMetadata('href'));
                },
                set: function (href) {
                  this.href$delegate.setValue_w32e13$(this, new Kotlin.PropertyMetadata('href'), href);
                }
              },
              rel: {
                get: function () {
                  return this.rel$delegate.getValue_dsk1ci$(this, new Kotlin.PropertyMetadata('rel'));
                },
                set: function (rel) {
                  this.rel$delegate.setValue_w32e13$(this, new Kotlin.PropertyMetadata('rel'), rel);
                }
              },
              target: {
                get: function () {
                  return this.target$delegate.getValue_dsk1ci$(this, new Kotlin.PropertyMetadata('target'));
                },
                set: function (target) {
                  this.target$delegate.setValue_w32e13$(this, new Kotlin.PropertyMetadata('target'), target);
                }
              }
            }),
            ImgProperties: Kotlin.createClass(function () {
              return [_.com.github.andrewoma.react.HtmlGlobalProperties];
            }, function $fun() {
              $fun.baseInitializer.call(this);
              this.alt$delegate = new _.com.github.andrewoma.react.Property();
              this.height$delegate = new _.com.github.andrewoma.react.Property();
              this.src$delegate = new _.com.github.andrewoma.react.Property();
              this.width$delegate = new _.com.github.andrewoma.react.Property();
            }, /** @lends _.com.github.andrewoma.react.ImgProperties.prototype */ {
              alt: {
                get: function () {
                  return this.alt$delegate.getValue_dsk1ci$(this, new Kotlin.PropertyMetadata('alt'));
                },
                set: function (alt) {
                  this.alt$delegate.setValue_w32e13$(this, new Kotlin.PropertyMetadata('alt'), alt);
                }
              },
              height: {
                get: function () {
                  return this.height$delegate.getValue_dsk1ci$(this, new Kotlin.PropertyMetadata('height'));
                },
                set: function (height) {
                  this.height$delegate.setValue_w32e13$(this, new Kotlin.PropertyMetadata('height'), height);
                }
              },
              src: {
                get: function () {
                  return this.src$delegate.getValue_dsk1ci$(this, new Kotlin.PropertyMetadata('src'));
                },
                set: function (src) {
                  this.src$delegate.setValue_w32e13$(this, new Kotlin.PropertyMetadata('src'), src);
                }
              },
              width: {
                get: function () {
                  return this.width$delegate.getValue_dsk1ci$(this, new Kotlin.PropertyMetadata('width'));
                },
                set: function (width) {
                  this.width$delegate.setValue_w32e13$(this, new Kotlin.PropertyMetadata('width'), width);
                }
              }
            }),
            ButtonProperties: Kotlin.createClass(function () {
              return [_.com.github.andrewoma.react.HtmlGlobalProperties];
            }, function $fun() {
              $fun.baseInitializer.call(this);
              this.autoFocus$delegate = new _.com.github.andrewoma.react.Property();
              this.disabled$delegate = new _.com.github.andrewoma.react.Property();
              this.form$delegate = new _.com.github.andrewoma.react.Property();
              this.name$delegate = new _.com.github.andrewoma.react.Property();
              this.type$delegate = new _.com.github.andrewoma.react.Property();
              this.value$delegate = new _.com.github.andrewoma.react.Property();
            }, /** @lends _.com.github.andrewoma.react.ButtonProperties.prototype */ {
              autoFocus: {
                get: function () {
                  return this.autoFocus$delegate.getValue_dsk1ci$(this, new Kotlin.PropertyMetadata('autoFocus'));
                },
                set: function (autoFocus) {
                  this.autoFocus$delegate.setValue_w32e13$(this, new Kotlin.PropertyMetadata('autoFocus'), autoFocus);
                }
              },
              disabled: {
                get: function () {
                  return this.disabled$delegate.getValue_dsk1ci$(this, new Kotlin.PropertyMetadata('disabled'));
                },
                set: function (disabled) {
                  this.disabled$delegate.setValue_w32e13$(this, new Kotlin.PropertyMetadata('disabled'), disabled);
                }
              },
              form: {
                get: function () {
                  return this.form$delegate.getValue_dsk1ci$(this, new Kotlin.PropertyMetadata('form'));
                },
                set: function (form) {
                  this.form$delegate.setValue_w32e13$(this, new Kotlin.PropertyMetadata('form'), form);
                }
              },
              name: {
                get: function () {
                  return this.name$delegate.getValue_dsk1ci$(this, new Kotlin.PropertyMetadata('name'));
                },
                set: function (name) {
                  this.name$delegate.setValue_w32e13$(this, new Kotlin.PropertyMetadata('name'), name);
                }
              },
              type: {
                get: function () {
                  return this.type$delegate.getValue_dsk1ci$(this, new Kotlin.PropertyMetadata('type'));
                },
                set: function (type) {
                  this.type$delegate.setValue_w32e13$(this, new Kotlin.PropertyMetadata('type'), type);
                }
              },
              value: {
                get: function () {
                  return this.value$delegate.getValue_dsk1ci$(this, new Kotlin.PropertyMetadata('value'));
                },
                set: function (value) {
                  this.value$delegate.setValue_w32e13$(this, new Kotlin.PropertyMetadata('value'), value);
                }
              }
            }),
            KeygenProperties: Kotlin.createClass(function () {
              return [_.com.github.andrewoma.react.HtmlGlobalProperties];
            }, function $fun() {
              $fun.baseInitializer.call(this);
              this.autoFocus$delegate = new _.com.github.andrewoma.react.Property();
              this.form$delegate = new _.com.github.andrewoma.react.Property();
              this.name$delegate = new _.com.github.andrewoma.react.Property();
            }, /** @lends _.com.github.andrewoma.react.KeygenProperties.prototype */ {
              autoFocus: {
                get: function () {
                  return this.autoFocus$delegate.getValue_dsk1ci$(this, new Kotlin.PropertyMetadata('autoFocus'));
                },
                set: function (autoFocus) {
                  this.autoFocus$delegate.setValue_w32e13$(this, new Kotlin.PropertyMetadata('autoFocus'), autoFocus);
                }
              },
              form: {
                get: function () {
                  return this.form$delegate.getValue_dsk1ci$(this, new Kotlin.PropertyMetadata('form'));
                },
                set: function (form) {
                  this.form$delegate.setValue_w32e13$(this, new Kotlin.PropertyMetadata('form'), form);
                }
              },
              name: {
                get: function () {
                  return this.name$delegate.getValue_dsk1ci$(this, new Kotlin.PropertyMetadata('name'));
                },
                set: function (name) {
                  this.name$delegate.setValue_w32e13$(this, new Kotlin.PropertyMetadata('name'), name);
                }
              }
            }),
            SelectProperties: Kotlin.createClass(function () {
              return [_.com.github.andrewoma.react.HtmlGlobalProperties];
            }, function $fun() {
              $fun.baseInitializer.call(this);
              this.autoFocus$delegate = new _.com.github.andrewoma.react.Property();
              this.disabled$delegate = new _.com.github.andrewoma.react.Property();
              this.form$delegate = new _.com.github.andrewoma.react.Property();
              this.multiple$delegate = new _.com.github.andrewoma.react.Property();
              this.name$delegate = new _.com.github.andrewoma.react.Property();
              this.required$delegate = new _.com.github.andrewoma.react.Property();
              this.size$delegate = new _.com.github.andrewoma.react.Property();
            }, /** @lends _.com.github.andrewoma.react.SelectProperties.prototype */ {
              autoFocus: {
                get: function () {
                  return this.autoFocus$delegate.getValue_dsk1ci$(this, new Kotlin.PropertyMetadata('autoFocus'));
                },
                set: function (autoFocus) {
                  this.autoFocus$delegate.setValue_w32e13$(this, new Kotlin.PropertyMetadata('autoFocus'), autoFocus);
                }
              },
              disabled: {
                get: function () {
                  return this.disabled$delegate.getValue_dsk1ci$(this, new Kotlin.PropertyMetadata('disabled'));
                },
                set: function (disabled) {
                  this.disabled$delegate.setValue_w32e13$(this, new Kotlin.PropertyMetadata('disabled'), disabled);
                }
              },
              form: {
                get: function () {
                  return this.form$delegate.getValue_dsk1ci$(this, new Kotlin.PropertyMetadata('form'));
                },
                set: function (form) {
                  this.form$delegate.setValue_w32e13$(this, new Kotlin.PropertyMetadata('form'), form);
                }
              },
              multiple: {
                get: function () {
                  return this.multiple$delegate.getValue_dsk1ci$(this, new Kotlin.PropertyMetadata('multiple'));
                },
                set: function (multiple) {
                  this.multiple$delegate.setValue_w32e13$(this, new Kotlin.PropertyMetadata('multiple'), multiple);
                }
              },
              name: {
                get: function () {
                  return this.name$delegate.getValue_dsk1ci$(this, new Kotlin.PropertyMetadata('name'));
                },
                set: function (name) {
                  this.name$delegate.setValue_w32e13$(this, new Kotlin.PropertyMetadata('name'), name);
                }
              },
              required: {
                get: function () {
                  return this.required$delegate.getValue_dsk1ci$(this, new Kotlin.PropertyMetadata('required'));
                },
                set: function (required) {
                  this.required$delegate.setValue_w32e13$(this, new Kotlin.PropertyMetadata('required'), required);
                }
              },
              size: {
                get: function () {
                  return this.size$delegate.getValue_dsk1ci$(this, new Kotlin.PropertyMetadata('size'));
                },
                set: function (size) {
                  this.size$delegate.setValue_w32e13$(this, new Kotlin.PropertyMetadata('size'), size);
                }
              }
            }),
            TextareaProperties: Kotlin.createClass(function () {
              return [_.com.github.andrewoma.react.HtmlGlobalProperties];
            }, function $fun() {
              $fun.baseInitializer.call(this);
              this.autoFocus$delegate = new _.com.github.andrewoma.react.Property();
              this.form$delegate = new _.com.github.andrewoma.react.Property();
              this.maxLength$delegate = new _.com.github.andrewoma.react.Property();
              this.name$delegate = new _.com.github.andrewoma.react.Property();
              this.placeholder$delegate = new _.com.github.andrewoma.react.Property();
              this.readOnly$delegate = new _.com.github.andrewoma.react.Property();
              this.required$delegate = new _.com.github.andrewoma.react.Property();
            }, /** @lends _.com.github.andrewoma.react.TextareaProperties.prototype */ {
              autoFocus: {
                get: function () {
                  return this.autoFocus$delegate.getValue_dsk1ci$(this, new Kotlin.PropertyMetadata('autoFocus'));
                },
                set: function (autoFocus) {
                  this.autoFocus$delegate.setValue_w32e13$(this, new Kotlin.PropertyMetadata('autoFocus'), autoFocus);
                }
              },
              form: {
                get: function () {
                  return this.form$delegate.getValue_dsk1ci$(this, new Kotlin.PropertyMetadata('form'));
                },
                set: function (form) {
                  this.form$delegate.setValue_w32e13$(this, new Kotlin.PropertyMetadata('form'), form);
                }
              },
              maxLength: {
                get: function () {
                  return this.maxLength$delegate.getValue_dsk1ci$(this, new Kotlin.PropertyMetadata('maxLength'));
                },
                set: function (maxLength) {
                  this.maxLength$delegate.setValue_w32e13$(this, new Kotlin.PropertyMetadata('maxLength'), maxLength);
                }
              },
              name: {
                get: function () {
                  return this.name$delegate.getValue_dsk1ci$(this, new Kotlin.PropertyMetadata('name'));
                },
                set: function (name) {
                  this.name$delegate.setValue_w32e13$(this, new Kotlin.PropertyMetadata('name'), name);
                }
              },
              placeholder: {
                get: function () {
                  return this.placeholder$delegate.getValue_dsk1ci$(this, new Kotlin.PropertyMetadata('placeholder'));
                },
                set: function (placeholder) {
                  this.placeholder$delegate.setValue_w32e13$(this, new Kotlin.PropertyMetadata('placeholder'), placeholder);
                }
              },
              readOnly: {
                get: function () {
                  return this.readOnly$delegate.getValue_dsk1ci$(this, new Kotlin.PropertyMetadata('readOnly'));
                },
                set: function (readOnly) {
                  this.readOnly$delegate.setValue_w32e13$(this, new Kotlin.PropertyMetadata('readOnly'), readOnly);
                }
              },
              required: {
                get: function () {
                  return this.required$delegate.getValue_dsk1ci$(this, new Kotlin.PropertyMetadata('required'));
                },
                set: function (required) {
                  this.required$delegate.setValue_w32e13$(this, new Kotlin.PropertyMetadata('required'), required);
                }
              }
            }),
            AudioProperties: Kotlin.createClass(function () {
              return [_.com.github.andrewoma.react.HtmlGlobalProperties];
            }, function $fun() {
              $fun.baseInitializer.call(this);
              this.autoPlay$delegate = new _.com.github.andrewoma.react.Property();
              this.controls$delegate = new _.com.github.andrewoma.react.Property();
              this.loop$delegate = new _.com.github.andrewoma.react.Property();
              this.preload$delegate = new _.com.github.andrewoma.react.Property();
              this.src$delegate = new _.com.github.andrewoma.react.Property();
            }, /** @lends _.com.github.andrewoma.react.AudioProperties.prototype */ {
              autoPlay: {
                get: function () {
                  return this.autoPlay$delegate.getValue_dsk1ci$(this, new Kotlin.PropertyMetadata('autoPlay'));
                },
                set: function (autoPlay) {
                  this.autoPlay$delegate.setValue_w32e13$(this, new Kotlin.PropertyMetadata('autoPlay'), autoPlay);
                }
              },
              controls: {
                get: function () {
                  return this.controls$delegate.getValue_dsk1ci$(this, new Kotlin.PropertyMetadata('controls'));
                },
                set: function (controls) {
                  this.controls$delegate.setValue_w32e13$(this, new Kotlin.PropertyMetadata('controls'), controls);
                }
              },
              loop: {
                get: function () {
                  return this.loop$delegate.getValue_dsk1ci$(this, new Kotlin.PropertyMetadata('loop'));
                },
                set: function (loop) {
                  this.loop$delegate.setValue_w32e13$(this, new Kotlin.PropertyMetadata('loop'), loop);
                }
              },
              preload: {
                get: function () {
                  return this.preload$delegate.getValue_dsk1ci$(this, new Kotlin.PropertyMetadata('preload'));
                },
                set: function (preload) {
                  this.preload$delegate.setValue_w32e13$(this, new Kotlin.PropertyMetadata('preload'), preload);
                }
              },
              src: {
                get: function () {
                  return this.src$delegate.getValue_dsk1ci$(this, new Kotlin.PropertyMetadata('src'));
                },
                set: function (src) {
                  this.src$delegate.setValue_w32e13$(this, new Kotlin.PropertyMetadata('src'), src);
                }
              }
            }),
            VideoProperties: Kotlin.createClass(function () {
              return [_.com.github.andrewoma.react.HtmlGlobalProperties];
            }, function $fun() {
              $fun.baseInitializer.call(this);
              this.autoPlay$delegate = new _.com.github.andrewoma.react.Property();
              this.controls$delegate = new _.com.github.andrewoma.react.Property();
              this.height$delegate = new _.com.github.andrewoma.react.Property();
              this.loop$delegate = new _.com.github.andrewoma.react.Property();
              this.poster$delegate = new _.com.github.andrewoma.react.Property();
              this.preload$delegate = new _.com.github.andrewoma.react.Property();
              this.src$delegate = new _.com.github.andrewoma.react.Property();
              this.width$delegate = new _.com.github.andrewoma.react.Property();
            }, /** @lends _.com.github.andrewoma.react.VideoProperties.prototype */ {
              autoPlay: {
                get: function () {
                  return this.autoPlay$delegate.getValue_dsk1ci$(this, new Kotlin.PropertyMetadata('autoPlay'));
                },
                set: function (autoPlay) {
                  this.autoPlay$delegate.setValue_w32e13$(this, new Kotlin.PropertyMetadata('autoPlay'), autoPlay);
                }
              },
              controls: {
                get: function () {
                  return this.controls$delegate.getValue_dsk1ci$(this, new Kotlin.PropertyMetadata('controls'));
                },
                set: function (controls) {
                  this.controls$delegate.setValue_w32e13$(this, new Kotlin.PropertyMetadata('controls'), controls);
                }
              },
              height: {
                get: function () {
                  return this.height$delegate.getValue_dsk1ci$(this, new Kotlin.PropertyMetadata('height'));
                },
                set: function (height) {
                  this.height$delegate.setValue_w32e13$(this, new Kotlin.PropertyMetadata('height'), height);
                }
              },
              loop: {
                get: function () {
                  return this.loop$delegate.getValue_dsk1ci$(this, new Kotlin.PropertyMetadata('loop'));
                },
                set: function (loop) {
                  this.loop$delegate.setValue_w32e13$(this, new Kotlin.PropertyMetadata('loop'), loop);
                }
              },
              poster: {
                get: function () {
                  return this.poster$delegate.getValue_dsk1ci$(this, new Kotlin.PropertyMetadata('poster'));
                },
                set: function (poster) {
                  this.poster$delegate.setValue_w32e13$(this, new Kotlin.PropertyMetadata('poster'), poster);
                }
              },
              preload: {
                get: function () {
                  return this.preload$delegate.getValue_dsk1ci$(this, new Kotlin.PropertyMetadata('preload'));
                },
                set: function (preload) {
                  this.preload$delegate.setValue_w32e13$(this, new Kotlin.PropertyMetadata('preload'), preload);
                }
              },
              src: {
                get: function () {
                  return this.src$delegate.getValue_dsk1ci$(this, new Kotlin.PropertyMetadata('src'));
                },
                set: function (src) {
                  this.src$delegate.setValue_w32e13$(this, new Kotlin.PropertyMetadata('src'), src);
                }
              },
              width: {
                get: function () {
                  return this.width$delegate.getValue_dsk1ci$(this, new Kotlin.PropertyMetadata('width'));
                },
                set: function (width) {
                  this.width$delegate.setValue_w32e13$(this, new Kotlin.PropertyMetadata('width'), width);
                }
              }
            }),
            TableProperties: Kotlin.createClass(function () {
              return [_.com.github.andrewoma.react.HtmlGlobalProperties];
            }, function $fun() {
              $fun.baseInitializer.call(this);
              this.cellPadding$delegate = new _.com.github.andrewoma.react.Property();
              this.cellSpacing$delegate = new _.com.github.andrewoma.react.Property();
            }, /** @lends _.com.github.andrewoma.react.TableProperties.prototype */ {
              cellPadding: {
                get: function () {
                  return this.cellPadding$delegate.getValue_dsk1ci$(this, new Kotlin.PropertyMetadata('cellPadding'));
                },
                set: function (cellPadding) {
                  this.cellPadding$delegate.setValue_w32e13$(this, new Kotlin.PropertyMetadata('cellPadding'), cellPadding);
                }
              },
              cellSpacing: {
                get: function () {
                  return this.cellSpacing$delegate.getValue_dsk1ci$(this, new Kotlin.PropertyMetadata('cellSpacing'));
                },
                set: function (cellSpacing) {
                  this.cellSpacing$delegate.setValue_w32e13$(this, new Kotlin.PropertyMetadata('cellSpacing'), cellSpacing);
                }
              }
            }),
            MetaProperties: Kotlin.createClass(function () {
              return [_.com.github.andrewoma.react.HtmlGlobalProperties];
            }, function $fun() {
              $fun.baseInitializer.call(this);
              this.charSet$delegate = new _.com.github.andrewoma.react.Property();
              this.content$delegate = new _.com.github.andrewoma.react.Property();
              this.httpEquiv$delegate = new _.com.github.andrewoma.react.Property();
              this.name$delegate = new _.com.github.andrewoma.react.Property();
            }, /** @lends _.com.github.andrewoma.react.MetaProperties.prototype */ {
              charSet: {
                get: function () {
                  return this.charSet$delegate.getValue_dsk1ci$(this, new Kotlin.PropertyMetadata('charSet'));
                },
                set: function (charSet) {
                  this.charSet$delegate.setValue_w32e13$(this, new Kotlin.PropertyMetadata('charSet'), charSet);
                }
              },
              content: {
                get: function () {
                  return this.content$delegate.getValue_dsk1ci$(this, new Kotlin.PropertyMetadata('content'));
                },
                set: function (content) {
                  this.content$delegate.setValue_w32e13$(this, new Kotlin.PropertyMetadata('content'), content);
                }
              },
              httpEquiv: {
                get: function () {
                  return this.httpEquiv$delegate.getValue_dsk1ci$(this, new Kotlin.PropertyMetadata('httpEquiv'));
                },
                set: function (httpEquiv) {
                  this.httpEquiv$delegate.setValue_w32e13$(this, new Kotlin.PropertyMetadata('httpEquiv'), httpEquiv);
                }
              },
              name: {
                get: function () {
                  return this.name$delegate.getValue_dsk1ci$(this, new Kotlin.PropertyMetadata('name'));
                },
                set: function (name) {
                  this.name$delegate.setValue_w32e13$(this, new Kotlin.PropertyMetadata('name'), name);
                }
              }
            }),
            ScriptProperties: Kotlin.createClass(function () {
              return [_.com.github.andrewoma.react.HtmlGlobalProperties];
            }, function $fun() {
              $fun.baseInitializer.call(this);
              this.charSet$delegate = new _.com.github.andrewoma.react.Property();
              this.src$delegate = new _.com.github.andrewoma.react.Property();
              this.type$delegate = new _.com.github.andrewoma.react.Property();
            }, /** @lends _.com.github.andrewoma.react.ScriptProperties.prototype */ {
              charSet: {
                get: function () {
                  return this.charSet$delegate.getValue_dsk1ci$(this, new Kotlin.PropertyMetadata('charSet'));
                },
                set: function (charSet) {
                  this.charSet$delegate.setValue_w32e13$(this, new Kotlin.PropertyMetadata('charSet'), charSet);
                }
              },
              src: {
                get: function () {
                  return this.src$delegate.getValue_dsk1ci$(this, new Kotlin.PropertyMetadata('src'));
                },
                set: function (src) {
                  this.src$delegate.setValue_w32e13$(this, new Kotlin.PropertyMetadata('src'), src);
                }
              },
              type: {
                get: function () {
                  return this.type$delegate.getValue_dsk1ci$(this, new Kotlin.PropertyMetadata('type'));
                },
                set: function (type) {
                  this.type$delegate.setValue_w32e13$(this, new Kotlin.PropertyMetadata('type'), type);
                }
              }
            }),
            CommandProperties: Kotlin.createClass(function () {
              return [_.com.github.andrewoma.react.HtmlGlobalProperties];
            }, function $fun() {
              $fun.baseInitializer.call(this);
              this.checked$delegate = new _.com.github.andrewoma.react.Property();
              this.icon$delegate = new _.com.github.andrewoma.react.Property();
              this.radioGroup$delegate = new _.com.github.andrewoma.react.Property();
              this.type$delegate = new _.com.github.andrewoma.react.Property();
            }, /** @lends _.com.github.andrewoma.react.CommandProperties.prototype */ {
              checked: {
                get: function () {
                  return this.checked$delegate.getValue_dsk1ci$(this, new Kotlin.PropertyMetadata('checked'));
                },
                set: function (checked) {
                  this.checked$delegate.setValue_w32e13$(this, new Kotlin.PropertyMetadata('checked'), checked);
                }
              },
              icon: {
                get: function () {
                  return this.icon$delegate.getValue_dsk1ci$(this, new Kotlin.PropertyMetadata('icon'));
                },
                set: function (icon) {
                  this.icon$delegate.setValue_w32e13$(this, new Kotlin.PropertyMetadata('icon'), icon);
                }
              },
              radioGroup: {
                get: function () {
                  return this.radioGroup$delegate.getValue_dsk1ci$(this, new Kotlin.PropertyMetadata('radioGroup'));
                },
                set: function (radioGroup) {
                  this.radioGroup$delegate.setValue_w32e13$(this, new Kotlin.PropertyMetadata('radioGroup'), radioGroup);
                }
              },
              type: {
                get: function () {
                  return this.type$delegate.getValue_dsk1ci$(this, new Kotlin.PropertyMetadata('type'));
                },
                set: function (type) {
                  this.type$delegate.setValue_w32e13$(this, new Kotlin.PropertyMetadata('type'), type);
                }
              }
            }),
            TdProperties: Kotlin.createClass(function () {
              return [_.com.github.andrewoma.react.HtmlGlobalProperties];
            }, function $fun() {
              $fun.baseInitializer.call(this);
              this.colSpan$delegate = new _.com.github.andrewoma.react.Property();
              this.rowSpan$delegate = new _.com.github.andrewoma.react.Property();
            }, /** @lends _.com.github.andrewoma.react.TdProperties.prototype */ {
              colSpan: {
                get: function () {
                  return this.colSpan$delegate.getValue_dsk1ci$(this, new Kotlin.PropertyMetadata('colSpan'));
                },
                set: function (colSpan) {
                  this.colSpan$delegate.setValue_w32e13$(this, new Kotlin.PropertyMetadata('colSpan'), colSpan);
                }
              },
              rowSpan: {
                get: function () {
                  return this.rowSpan$delegate.getValue_dsk1ci$(this, new Kotlin.PropertyMetadata('rowSpan'));
                },
                set: function (rowSpan) {
                  this.rowSpan$delegate.setValue_w32e13$(this, new Kotlin.PropertyMetadata('rowSpan'), rowSpan);
                }
              }
            }),
            ThProperties: Kotlin.createClass(function () {
              return [_.com.github.andrewoma.react.HtmlGlobalProperties];
            }, function $fun() {
              $fun.baseInitializer.call(this);
              this.colSpan$delegate = new _.com.github.andrewoma.react.Property();
              this.rowSpan$delegate = new _.com.github.andrewoma.react.Property();
            }, /** @lends _.com.github.andrewoma.react.ThProperties.prototype */ {
              colSpan: {
                get: function () {
                  return this.colSpan$delegate.getValue_dsk1ci$(this, new Kotlin.PropertyMetadata('colSpan'));
                },
                set: function (colSpan) {
                  this.colSpan$delegate.setValue_w32e13$(this, new Kotlin.PropertyMetadata('colSpan'), colSpan);
                }
              },
              rowSpan: {
                get: function () {
                  return this.rowSpan$delegate.getValue_dsk1ci$(this, new Kotlin.PropertyMetadata('rowSpan'));
                },
                set: function (rowSpan) {
                  this.rowSpan$delegate.setValue_w32e13$(this, new Kotlin.PropertyMetadata('rowSpan'), rowSpan);
                }
              }
            }),
            ObjectProperties: Kotlin.createClass(function () {
              return [_.com.github.andrewoma.react.HtmlGlobalProperties];
            }, function $fun() {
              $fun.baseInitializer.call(this);
              this.data$delegate = new _.com.github.andrewoma.react.Property();
              this.form$delegate = new _.com.github.andrewoma.react.Property();
              this.height$delegate = new _.com.github.andrewoma.react.Property();
              this.name$delegate = new _.com.github.andrewoma.react.Property();
              this.type$delegate = new _.com.github.andrewoma.react.Property();
              this.width$delegate = new _.com.github.andrewoma.react.Property();
              this.wmode$delegate = new _.com.github.andrewoma.react.Property();
            }, /** @lends _.com.github.andrewoma.react.ObjectProperties.prototype */ {
              data: {
                get: function () {
                  return this.data$delegate.getValue_dsk1ci$(this, new Kotlin.PropertyMetadata('data'));
                },
                set: function (data) {
                  this.data$delegate.setValue_w32e13$(this, new Kotlin.PropertyMetadata('data'), data);
                }
              },
              form: {
                get: function () {
                  return this.form$delegate.getValue_dsk1ci$(this, new Kotlin.PropertyMetadata('form'));
                },
                set: function (form) {
                  this.form$delegate.setValue_w32e13$(this, new Kotlin.PropertyMetadata('form'), form);
                }
              },
              height: {
                get: function () {
                  return this.height$delegate.getValue_dsk1ci$(this, new Kotlin.PropertyMetadata('height'));
                },
                set: function (height) {
                  this.height$delegate.setValue_w32e13$(this, new Kotlin.PropertyMetadata('height'), height);
                }
              },
              name: {
                get: function () {
                  return this.name$delegate.getValue_dsk1ci$(this, new Kotlin.PropertyMetadata('name'));
                },
                set: function (name) {
                  this.name$delegate.setValue_w32e13$(this, new Kotlin.PropertyMetadata('name'), name);
                }
              },
              type: {
                get: function () {
                  return this.type$delegate.getValue_dsk1ci$(this, new Kotlin.PropertyMetadata('type'));
                },
                set: function (type) {
                  this.type$delegate.setValue_w32e13$(this, new Kotlin.PropertyMetadata('type'), type);
                }
              },
              width: {
                get: function () {
                  return this.width$delegate.getValue_dsk1ci$(this, new Kotlin.PropertyMetadata('width'));
                },
                set: function (width) {
                  this.width$delegate.setValue_w32e13$(this, new Kotlin.PropertyMetadata('width'), width);
                }
              },
              wmode: {
                get: function () {
                  return this.wmode$delegate.getValue_dsk1ci$(this, new Kotlin.PropertyMetadata('wmode'));
                },
                set: function (wmode) {
                  this.wmode$delegate.setValue_w32e13$(this, new Kotlin.PropertyMetadata('wmode'), wmode);
                }
              }
            }),
            DelProperties: Kotlin.createClass(function () {
              return [_.com.github.andrewoma.react.HtmlGlobalProperties];
            }, function $fun() {
              $fun.baseInitializer.call(this);
              this.dateTime$delegate = new _.com.github.andrewoma.react.Property();
            }, /** @lends _.com.github.andrewoma.react.DelProperties.prototype */ {
              dateTime: {
                get: function () {
                  return this.dateTime$delegate.getValue_dsk1ci$(this, new Kotlin.PropertyMetadata('dateTime'));
                },
                set: function (dateTime) {
                  this.dateTime$delegate.setValue_w32e13$(this, new Kotlin.PropertyMetadata('dateTime'), dateTime);
                }
              }
            }),
            InsProperties: Kotlin.createClass(function () {
              return [_.com.github.andrewoma.react.HtmlGlobalProperties];
            }, function $fun() {
              $fun.baseInitializer.call(this);
              this.dateTime$delegate = new _.com.github.andrewoma.react.Property();
            }, /** @lends _.com.github.andrewoma.react.InsProperties.prototype */ {
              dateTime: {
                get: function () {
                  return this.dateTime$delegate.getValue_dsk1ci$(this, new Kotlin.PropertyMetadata('dateTime'));
                },
                set: function (dateTime) {
                  this.dateTime$delegate.setValue_w32e13$(this, new Kotlin.PropertyMetadata('dateTime'), dateTime);
                }
              }
            }),
            TimeProperties: Kotlin.createClass(function () {
              return [_.com.github.andrewoma.react.HtmlGlobalProperties];
            }, function $fun() {
              $fun.baseInitializer.call(this);
              this.dateTime$delegate = new _.com.github.andrewoma.react.Property();
            }, /** @lends _.com.github.andrewoma.react.TimeProperties.prototype */ {
              dateTime: {
                get: function () {
                  return this.dateTime$delegate.getValue_dsk1ci$(this, new Kotlin.PropertyMetadata('dateTime'));
                },
                set: function (dateTime) {
                  this.dateTime$delegate.setValue_w32e13$(this, new Kotlin.PropertyMetadata('dateTime'), dateTime);
                }
              }
            }),
            FieldsetProperties: Kotlin.createClass(function () {
              return [_.com.github.andrewoma.react.HtmlGlobalProperties];
            }, function $fun() {
              $fun.baseInitializer.call(this);
              this.form$delegate = new _.com.github.andrewoma.react.Property();
              this.name$delegate = new _.com.github.andrewoma.react.Property();
            }, /** @lends _.com.github.andrewoma.react.FieldsetProperties.prototype */ {
              form: {
                get: function () {
                  return this.form$delegate.getValue_dsk1ci$(this, new Kotlin.PropertyMetadata('form'));
                },
                set: function (form) {
                  this.form$delegate.setValue_w32e13$(this, new Kotlin.PropertyMetadata('form'), form);
                }
              },
              name: {
                get: function () {
                  return this.name$delegate.getValue_dsk1ci$(this, new Kotlin.PropertyMetadata('name'));
                },
                set: function (name) {
                  this.name$delegate.setValue_w32e13$(this, new Kotlin.PropertyMetadata('name'), name);
                }
              }
            }),
            LabelProperties: Kotlin.createClass(function () {
              return [_.com.github.andrewoma.react.HtmlGlobalProperties];
            }, function $fun() {
              $fun.baseInitializer.call(this);
              this.form$delegate = new _.com.github.andrewoma.react.Property();
              this.htmlFor$delegate = new _.com.github.andrewoma.react.Property();
            }, /** @lends _.com.github.andrewoma.react.LabelProperties.prototype */ {
              form: {
                get: function () {
                  return this.form$delegate.getValue_dsk1ci$(this, new Kotlin.PropertyMetadata('form'));
                },
                set: function (form) {
                  this.form$delegate.setValue_w32e13$(this, new Kotlin.PropertyMetadata('form'), form);
                }
              },
              htmlFor: {
                get: function () {
                  return this.htmlFor$delegate.getValue_dsk1ci$(this, new Kotlin.PropertyMetadata('htmlFor'));
                },
                set: function (htmlFor) {
                  this.htmlFor$delegate.setValue_w32e13$(this, new Kotlin.PropertyMetadata('htmlFor'), htmlFor);
                }
              }
            }),
            MeterProperties: Kotlin.createClass(function () {
              return [_.com.github.andrewoma.react.HtmlGlobalProperties];
            }, function $fun() {
              $fun.baseInitializer.call(this);
              this.form$delegate = new _.com.github.andrewoma.react.Property();
              this.max$delegate = new _.com.github.andrewoma.react.Property();
              this.min$delegate = new _.com.github.andrewoma.react.Property();
              this.value$delegate = new _.com.github.andrewoma.react.Property();
              this.high$delegate = new _.com.github.andrewoma.react.Property();
              this.low$delegate = new _.com.github.andrewoma.react.Property();
              this.optimum$delegate = new _.com.github.andrewoma.react.Property();
            }, /** @lends _.com.github.andrewoma.react.MeterProperties.prototype */ {
              form: {
                get: function () {
                  return this.form$delegate.getValue_dsk1ci$(this, new Kotlin.PropertyMetadata('form'));
                },
                set: function (form) {
                  this.form$delegate.setValue_w32e13$(this, new Kotlin.PropertyMetadata('form'), form);
                }
              },
              max: {
                get: function () {
                  return this.max$delegate.getValue_dsk1ci$(this, new Kotlin.PropertyMetadata('max'));
                },
                set: function (max) {
                  this.max$delegate.setValue_w32e13$(this, new Kotlin.PropertyMetadata('max'), max);
                }
              },
              min: {
                get: function () {
                  return this.min$delegate.getValue_dsk1ci$(this, new Kotlin.PropertyMetadata('min'));
                },
                set: function (min) {
                  this.min$delegate.setValue_w32e13$(this, new Kotlin.PropertyMetadata('min'), min);
                }
              },
              value: {
                get: function () {
                  return this.value$delegate.getValue_dsk1ci$(this, new Kotlin.PropertyMetadata('value'));
                },
                set: function (value) {
                  this.value$delegate.setValue_w32e13$(this, new Kotlin.PropertyMetadata('value'), value);
                }
              },
              high: {
                get: function () {
                  return this.high$delegate.getValue_dsk1ci$(this, new Kotlin.PropertyMetadata('high'));
                },
                set: function (high) {
                  this.high$delegate.setValue_w32e13$(this, new Kotlin.PropertyMetadata('high'), high);
                }
              },
              low: {
                get: function () {
                  return this.low$delegate.getValue_dsk1ci$(this, new Kotlin.PropertyMetadata('low'));
                },
                set: function (low) {
                  this.low$delegate.setValue_w32e13$(this, new Kotlin.PropertyMetadata('low'), low);
                }
              },
              optimum: {
                get: function () {
                  return this.optimum$delegate.getValue_dsk1ci$(this, new Kotlin.PropertyMetadata('optimum'));
                },
                set: function (optimum) {
                  this.optimum$delegate.setValue_w32e13$(this, new Kotlin.PropertyMetadata('optimum'), optimum);
                }
              }
            }),
            OutputProperties: Kotlin.createClass(function () {
              return [_.com.github.andrewoma.react.HtmlGlobalProperties];
            }, function $fun() {
              $fun.baseInitializer.call(this);
              this.form$delegate = new _.com.github.andrewoma.react.Property();
              this.htmlFor$delegate = new _.com.github.andrewoma.react.Property();
              this.name$delegate = new _.com.github.andrewoma.react.Property();
            }, /** @lends _.com.github.andrewoma.react.OutputProperties.prototype */ {
              form: {
                get: function () {
                  return this.form$delegate.getValue_dsk1ci$(this, new Kotlin.PropertyMetadata('form'));
                },
                set: function (form) {
                  this.form$delegate.setValue_w32e13$(this, new Kotlin.PropertyMetadata('form'), form);
                }
              },
              htmlFor: {
                get: function () {
                  return this.htmlFor$delegate.getValue_dsk1ci$(this, new Kotlin.PropertyMetadata('htmlFor'));
                },
                set: function (htmlFor) {
                  this.htmlFor$delegate.setValue_w32e13$(this, new Kotlin.PropertyMetadata('htmlFor'), htmlFor);
                }
              },
              name: {
                get: function () {
                  return this.name$delegate.getValue_dsk1ci$(this, new Kotlin.PropertyMetadata('name'));
                },
                set: function (name) {
                  this.name$delegate.setValue_w32e13$(this, new Kotlin.PropertyMetadata('name'), name);
                }
              }
            }),
            ProgressProperties: Kotlin.createClass(function () {
              return [_.com.github.andrewoma.react.HtmlGlobalProperties];
            }, function $fun() {
              $fun.baseInitializer.call(this);
              this.form$delegate = new _.com.github.andrewoma.react.Property();
              this.max$delegate = new _.com.github.andrewoma.react.Property();
              this.value$delegate = new _.com.github.andrewoma.react.Property();
            }, /** @lends _.com.github.andrewoma.react.ProgressProperties.prototype */ {
              form: {
                get: function () {
                  return this.form$delegate.getValue_dsk1ci$(this, new Kotlin.PropertyMetadata('form'));
                },
                set: function (form) {
                  this.form$delegate.setValue_w32e13$(this, new Kotlin.PropertyMetadata('form'), form);
                }
              },
              max: {
                get: function () {
                  return this.max$delegate.getValue_dsk1ci$(this, new Kotlin.PropertyMetadata('max'));
                },
                set: function (max) {
                  this.max$delegate.setValue_w32e13$(this, new Kotlin.PropertyMetadata('max'), max);
                }
              },
              value: {
                get: function () {
                  return this.value$delegate.getValue_dsk1ci$(this, new Kotlin.PropertyMetadata('value'));
                },
                set: function (value) {
                  this.value$delegate.setValue_w32e13$(this, new Kotlin.PropertyMetadata('value'), value);
                }
              }
            }),
            CanvasProperties: Kotlin.createClass(function () {
              return [_.com.github.andrewoma.react.HtmlGlobalProperties];
            }, function $fun() {
              $fun.baseInitializer.call(this);
              this.height$delegate = new _.com.github.andrewoma.react.Property();
              this.width$delegate = new _.com.github.andrewoma.react.Property();
            }, /** @lends _.com.github.andrewoma.react.CanvasProperties.prototype */ {
              height: {
                get: function () {
                  return this.height$delegate.getValue_dsk1ci$(this, new Kotlin.PropertyMetadata('height'));
                },
                set: function (height) {
                  this.height$delegate.setValue_w32e13$(this, new Kotlin.PropertyMetadata('height'), height);
                }
              },
              width: {
                get: function () {
                  return this.width$delegate.getValue_dsk1ci$(this, new Kotlin.PropertyMetadata('width'));
                },
                set: function (width) {
                  this.width$delegate.setValue_w32e13$(this, new Kotlin.PropertyMetadata('width'), width);
                }
              }
            }),
            EmbedProperties: Kotlin.createClass(function () {
              return [_.com.github.andrewoma.react.HtmlGlobalProperties];
            }, function $fun() {
              $fun.baseInitializer.call(this);
              this.height$delegate = new _.com.github.andrewoma.react.Property();
              this.src$delegate = new _.com.github.andrewoma.react.Property();
              this.type$delegate = new _.com.github.andrewoma.react.Property();
              this.width$delegate = new _.com.github.andrewoma.react.Property();
            }, /** @lends _.com.github.andrewoma.react.EmbedProperties.prototype */ {
              height: {
                get: function () {
                  return this.height$delegate.getValue_dsk1ci$(this, new Kotlin.PropertyMetadata('height'));
                },
                set: function (height) {
                  this.height$delegate.setValue_w32e13$(this, new Kotlin.PropertyMetadata('height'), height);
                }
              },
              src: {
                get: function () {
                  return this.src$delegate.getValue_dsk1ci$(this, new Kotlin.PropertyMetadata('src'));
                },
                set: function (src) {
                  this.src$delegate.setValue_w32e13$(this, new Kotlin.PropertyMetadata('src'), src);
                }
              },
              type: {
                get: function () {
                  return this.type$delegate.getValue_dsk1ci$(this, new Kotlin.PropertyMetadata('type'));
                },
                set: function (type) {
                  this.type$delegate.setValue_w32e13$(this, new Kotlin.PropertyMetadata('type'), type);
                }
              },
              width: {
                get: function () {
                  return this.width$delegate.getValue_dsk1ci$(this, new Kotlin.PropertyMetadata('width'));
                },
                set: function (width) {
                  this.width$delegate.setValue_w32e13$(this, new Kotlin.PropertyMetadata('width'), width);
                }
              }
            }),
            AProperties: Kotlin.createClass(function () {
              return [_.com.github.andrewoma.react.HtmlGlobalProperties];
            }, function $fun() {
              $fun.baseInitializer.call(this);
              this.href$delegate = new _.com.github.andrewoma.react.Property();
              this.rel$delegate = new _.com.github.andrewoma.react.Property();
              this.target$delegate = new _.com.github.andrewoma.react.Property();
            }, /** @lends _.com.github.andrewoma.react.AProperties.prototype */ {
              href: {
                get: function () {
                  return this.href$delegate.getValue_dsk1ci$(this, new Kotlin.PropertyMetadata('href'));
                },
                set: function (href) {
                  this.href$delegate.setValue_w32e13$(this, new Kotlin.PropertyMetadata('href'), href);
                }
              },
              rel: {
                get: function () {
                  return this.rel$delegate.getValue_dsk1ci$(this, new Kotlin.PropertyMetadata('rel'));
                },
                set: function (rel) {
                  this.rel$delegate.setValue_w32e13$(this, new Kotlin.PropertyMetadata('rel'), rel);
                }
              },
              target: {
                get: function () {
                  return this.target$delegate.getValue_dsk1ci$(this, new Kotlin.PropertyMetadata('target'));
                },
                set: function (target) {
                  this.target$delegate.setValue_w32e13$(this, new Kotlin.PropertyMetadata('target'), target);
                }
              }
            }),
            BaseProperties: Kotlin.createClass(function () {
              return [_.com.github.andrewoma.react.HtmlGlobalProperties];
            }, function $fun() {
              $fun.baseInitializer.call(this);
              this.href$delegate = new _.com.github.andrewoma.react.Property();
              this.target$delegate = new _.com.github.andrewoma.react.Property();
            }, /** @lends _.com.github.andrewoma.react.BaseProperties.prototype */ {
              href: {
                get: function () {
                  return this.href$delegate.getValue_dsk1ci$(this, new Kotlin.PropertyMetadata('href'));
                },
                set: function (href) {
                  this.href$delegate.setValue_w32e13$(this, new Kotlin.PropertyMetadata('href'), href);
                }
              },
              target: {
                get: function () {
                  return this.target$delegate.getValue_dsk1ci$(this, new Kotlin.PropertyMetadata('target'));
                },
                set: function (target) {
                  this.target$delegate.setValue_w32e13$(this, new Kotlin.PropertyMetadata('target'), target);
                }
              }
            }),
            LinkProperties: Kotlin.createClass(function () {
              return [_.com.github.andrewoma.react.HtmlGlobalProperties];
            }, function $fun() {
              $fun.baseInitializer.call(this);
              this.href$delegate = new _.com.github.andrewoma.react.Property();
              this.rel$delegate = new _.com.github.andrewoma.react.Property();
            }, /** @lends _.com.github.andrewoma.react.LinkProperties.prototype */ {
              href: {
                get: function () {
                  return this.href$delegate.getValue_dsk1ci$(this, new Kotlin.PropertyMetadata('href'));
                },
                set: function (href) {
                  this.href$delegate.setValue_w32e13$(this, new Kotlin.PropertyMetadata('href'), href);
                }
              },
              rel: {
                get: function () {
                  return this.rel$delegate.getValue_dsk1ci$(this, new Kotlin.PropertyMetadata('rel'));
                },
                set: function (rel) {
                  this.rel$delegate.setValue_w32e13$(this, new Kotlin.PropertyMetadata('rel'), rel);
                }
              }
            }),
            TrackProperties: Kotlin.createClass(function () {
              return [_.com.github.andrewoma.react.HtmlGlobalProperties];
            }, function $fun() {
              $fun.baseInitializer.call(this);
              this.label$delegate = new _.com.github.andrewoma.react.Property();
              this.src$delegate = new _.com.github.andrewoma.react.Property();
            }, /** @lends _.com.github.andrewoma.react.TrackProperties.prototype */ {
              label: {
                get: function () {
                  return this.label$delegate.getValue_dsk1ci$(this, new Kotlin.PropertyMetadata('label'));
                },
                set: function (label) {
                  this.label$delegate.setValue_w32e13$(this, new Kotlin.PropertyMetadata('label'), label);
                }
              },
              src: {
                get: function () {
                  return this.src$delegate.getValue_dsk1ci$(this, new Kotlin.PropertyMetadata('src'));
                },
                set: function (src) {
                  this.src$delegate.setValue_w32e13$(this, new Kotlin.PropertyMetadata('src'), src);
                }
              }
            }),
            BgsoundProperties: Kotlin.createClass(function () {
              return [_.com.github.andrewoma.react.HtmlGlobalProperties];
            }, function $fun() {
              $fun.baseInitializer.call(this);
              this.loop$delegate = new _.com.github.andrewoma.react.Property();
            }, /** @lends _.com.github.andrewoma.react.BgsoundProperties.prototype */ {
              loop: {
                get: function () {
                  return this.loop$delegate.getValue_dsk1ci$(this, new Kotlin.PropertyMetadata('loop'));
                },
                set: function (loop) {
                  this.loop$delegate.setValue_w32e13$(this, new Kotlin.PropertyMetadata('loop'), loop);
                }
              }
            }),
            MarqueeProperties: Kotlin.createClass(function () {
              return [_.com.github.andrewoma.react.HtmlGlobalProperties];
            }, function $fun() {
              $fun.baseInitializer.call(this);
              this.loop$delegate = new _.com.github.andrewoma.react.Property();
            }, /** @lends _.com.github.andrewoma.react.MarqueeProperties.prototype */ {
              loop: {
                get: function () {
                  return this.loop$delegate.getValue_dsk1ci$(this, new Kotlin.PropertyMetadata('loop'));
                },
                set: function (loop) {
                  this.loop$delegate.setValue_w32e13$(this, new Kotlin.PropertyMetadata('loop'), loop);
                }
              }
            }),
            MapProperties: Kotlin.createClass(function () {
              return [_.com.github.andrewoma.react.HtmlGlobalProperties];
            }, function $fun() {
              $fun.baseInitializer.call(this);
              this.name$delegate = new _.com.github.andrewoma.react.Property();
            }, /** @lends _.com.github.andrewoma.react.MapProperties.prototype */ {
              name: {
                get: function () {
                  return this.name$delegate.getValue_dsk1ci$(this, new Kotlin.PropertyMetadata('name'));
                },
                set: function (name) {
                  this.name$delegate.setValue_w32e13$(this, new Kotlin.PropertyMetadata('name'), name);
                }
              }
            }),
            ParamProperties: Kotlin.createClass(function () {
              return [_.com.github.andrewoma.react.HtmlGlobalProperties];
            }, function $fun() {
              $fun.baseInitializer.call(this);
              this.name$delegate = new _.com.github.andrewoma.react.Property();
              this.value$delegate = new _.com.github.andrewoma.react.Property();
            }, /** @lends _.com.github.andrewoma.react.ParamProperties.prototype */ {
              name: {
                get: function () {
                  return this.name$delegate.getValue_dsk1ci$(this, new Kotlin.PropertyMetadata('name'));
                },
                set: function (name) {
                  this.name$delegate.setValue_w32e13$(this, new Kotlin.PropertyMetadata('name'), name);
                }
              },
              value: {
                get: function () {
                  return this.value$delegate.getValue_dsk1ci$(this, new Kotlin.PropertyMetadata('value'));
                },
                set: function (value) {
                  this.value$delegate.setValue_w32e13$(this, new Kotlin.PropertyMetadata('value'), value);
                }
              }
            }),
            OptionProperties: Kotlin.createClass(function () {
              return [_.com.github.andrewoma.react.HtmlGlobalProperties];
            }, function $fun() {
              $fun.baseInitializer.call(this);
              this.selected$delegate = new _.com.github.andrewoma.react.Property();
              this.value$delegate = new _.com.github.andrewoma.react.Property();
            }, /** @lends _.com.github.andrewoma.react.OptionProperties.prototype */ {
              selected: {
                get: function () {
                  return this.selected$delegate.getValue_dsk1ci$(this, new Kotlin.PropertyMetadata('selected'));
                },
                set: function (selected) {
                  this.selected$delegate.setValue_w32e13$(this, new Kotlin.PropertyMetadata('selected'), selected);
                }
              },
              value: {
                get: function () {
                  return this.value$delegate.getValue_dsk1ci$(this, new Kotlin.PropertyMetadata('value'));
                },
                set: function (value) {
                  this.value$delegate.setValue_w32e13$(this, new Kotlin.PropertyMetadata('value'), value);
                }
              }
            }),
            SourceProperties: Kotlin.createClass(function () {
              return [_.com.github.andrewoma.react.HtmlGlobalProperties];
            }, function $fun() {
              $fun.baseInitializer.call(this);
              this.src$delegate = new _.com.github.andrewoma.react.Property();
              this.type$delegate = new _.com.github.andrewoma.react.Property();
            }, /** @lends _.com.github.andrewoma.react.SourceProperties.prototype */ {
              src: {
                get: function () {
                  return this.src$delegate.getValue_dsk1ci$(this, new Kotlin.PropertyMetadata('src'));
                },
                set: function (src) {
                  this.src$delegate.setValue_w32e13$(this, new Kotlin.PropertyMetadata('src'), src);
                }
              },
              type: {
                get: function () {
                  return this.type$delegate.getValue_dsk1ci$(this, new Kotlin.PropertyMetadata('type'));
                },
                set: function (type) {
                  this.type$delegate.setValue_w32e13$(this, new Kotlin.PropertyMetadata('type'), type);
                }
              }
            }),
            StyleProperties: Kotlin.createClass(function () {
              return [_.com.github.andrewoma.react.HtmlGlobalProperties];
            }, function $fun() {
              $fun.baseInitializer.call(this);
              this.type$delegate = new _.com.github.andrewoma.react.Property();
              this.scoped$delegate = new _.com.github.andrewoma.react.Property();
            }, /** @lends _.com.github.andrewoma.react.StyleProperties.prototype */ {
              type: {
                get: function () {
                  return this.type$delegate.getValue_dsk1ci$(this, new Kotlin.PropertyMetadata('type'));
                },
                set: function (type) {
                  this.type$delegate.setValue_w32e13$(this, new Kotlin.PropertyMetadata('type'), type);
                }
              },
              scoped: {
                get: function () {
                  return this.scoped$delegate.getValue_dsk1ci$(this, new Kotlin.PropertyMetadata('scoped'));
                },
                set: function (scoped) {
                  this.scoped$delegate.setValue_w32e13$(this, new Kotlin.PropertyMetadata('scoped'), scoped);
                }
              }
            }),
            MenuProperties: Kotlin.createClass(function () {
              return [_.com.github.andrewoma.react.HtmlGlobalProperties];
            }, function $fun() {
              $fun.baseInitializer.call(this);
              this.type$delegate = new _.com.github.andrewoma.react.Property();
            }, /** @lends _.com.github.andrewoma.react.MenuProperties.prototype */ {
              type: {
                get: function () {
                  return this.type$delegate.getValue_dsk1ci$(this, new Kotlin.PropertyMetadata('type'));
                },
                set: function (type) {
                  this.type$delegate.setValue_w32e13$(this, new Kotlin.PropertyMetadata('type'), type);
                }
              }
            }),
            LiProperties: Kotlin.createClass(function () {
              return [_.com.github.andrewoma.react.HtmlGlobalProperties];
            }, function $fun() {
              $fun.baseInitializer.call(this);
              this.value$delegate = new _.com.github.andrewoma.react.Property();
            }, /** @lends _.com.github.andrewoma.react.LiProperties.prototype */ {
              value: {
                get: function () {
                  return this.value$delegate.getValue_dsk1ci$(this, new Kotlin.PropertyMetadata('value'));
                },
                set: function (value) {
                  this.value$delegate.setValue_w32e13$(this, new Kotlin.PropertyMetadata('value'), value);
                }
              }
            }),
            SvgProperties: Kotlin.createClass(function () {
              return [_.com.github.andrewoma.react.ReactProperties];
            }, function $fun() {
              $fun.baseInitializer.call(this);
              this.id$delegate = new _.com.github.andrewoma.react.Property();
              this.cx$delegate = new _.com.github.andrewoma.react.Property();
              this.cy$delegate = new _.com.github.andrewoma.react.Property();
              this.d$delegate = new _.com.github.andrewoma.react.Property();
              this.fill$delegate = new _.com.github.andrewoma.react.Property();
              this.fx$delegate = new _.com.github.andrewoma.react.Property();
              this.fy$delegate = new _.com.github.andrewoma.react.Property();
              this.gradientTransform$delegate = new _.com.github.andrewoma.react.Property();
              this.gradientUnits$delegate = new _.com.github.andrewoma.react.Property();
              this.offset$delegate = new _.com.github.andrewoma.react.Property();
              this.points$delegate = new _.com.github.andrewoma.react.Property();
              this.r$delegate = new _.com.github.andrewoma.react.Property();
              this.rx$delegate = new _.com.github.andrewoma.react.Property();
              this.ry$delegate = new _.com.github.andrewoma.react.Property();
              this.spreadMethod$delegate = new _.com.github.andrewoma.react.Property();
              this.stopColor$delegate = new _.com.github.andrewoma.react.Property();
              this.stopOpacity$delegate = new _.com.github.andrewoma.react.Property();
              this.stroke$delegate = new _.com.github.andrewoma.react.Property();
              this.strokeLinecap$delegate = new _.com.github.andrewoma.react.Property();
              this.strokeWidth$delegate = new _.com.github.andrewoma.react.Property();
              this.transform$delegate = new _.com.github.andrewoma.react.Property();
              this.version$delegate = new _.com.github.andrewoma.react.Property();
              this.viewBox$delegate = new _.com.github.andrewoma.react.Property();
              this.x1$delegate = new _.com.github.andrewoma.react.Property();
              this.x2$delegate = new _.com.github.andrewoma.react.Property();
              this.x$delegate = new _.com.github.andrewoma.react.Property();
              this.y1$delegate = new _.com.github.andrewoma.react.Property();
              this.y2$delegate = new _.com.github.andrewoma.react.Property();
              this.y$delegate = new _.com.github.andrewoma.react.Property();
            }, /** @lends _.com.github.andrewoma.react.SvgProperties.prototype */ {
              id: {
                get: function () {
                  return this.id$delegate.getValue_dsk1ci$(this, new Kotlin.PropertyMetadata('id'));
                },
                set: function (id) {
                  this.id$delegate.setValue_w32e13$(this, new Kotlin.PropertyMetadata('id'), id);
                }
              },
              cx: {
                get: function () {
                  return this.cx$delegate.getValue_dsk1ci$(this, new Kotlin.PropertyMetadata('cx'));
                },
                set: function (cx) {
                  this.cx$delegate.setValue_w32e13$(this, new Kotlin.PropertyMetadata('cx'), cx);
                }
              },
              cy: {
                get: function () {
                  return this.cy$delegate.getValue_dsk1ci$(this, new Kotlin.PropertyMetadata('cy'));
                },
                set: function (cy) {
                  this.cy$delegate.setValue_w32e13$(this, new Kotlin.PropertyMetadata('cy'), cy);
                }
              },
              d: {
                get: function () {
                  return this.d$delegate.getValue_dsk1ci$(this, new Kotlin.PropertyMetadata('d'));
                },
                set: function (d) {
                  this.d$delegate.setValue_w32e13$(this, new Kotlin.PropertyMetadata('d'), d);
                }
              },
              fill: {
                get: function () {
                  return this.fill$delegate.getValue_dsk1ci$(this, new Kotlin.PropertyMetadata('fill'));
                },
                set: function (fill) {
                  this.fill$delegate.setValue_w32e13$(this, new Kotlin.PropertyMetadata('fill'), fill);
                }
              },
              fx: {
                get: function () {
                  return this.fx$delegate.getValue_dsk1ci$(this, new Kotlin.PropertyMetadata('fx'));
                },
                set: function (fx) {
                  this.fx$delegate.setValue_w32e13$(this, new Kotlin.PropertyMetadata('fx'), fx);
                }
              },
              fy: {
                get: function () {
                  return this.fy$delegate.getValue_dsk1ci$(this, new Kotlin.PropertyMetadata('fy'));
                },
                set: function (fy) {
                  this.fy$delegate.setValue_w32e13$(this, new Kotlin.PropertyMetadata('fy'), fy);
                }
              },
              gradientTransform: {
                get: function () {
                  return this.gradientTransform$delegate.getValue_dsk1ci$(this, new Kotlin.PropertyMetadata('gradientTransform'));
                },
                set: function (gradientTransform) {
                  this.gradientTransform$delegate.setValue_w32e13$(this, new Kotlin.PropertyMetadata('gradientTransform'), gradientTransform);
                }
              },
              gradientUnits: {
                get: function () {
                  return this.gradientUnits$delegate.getValue_dsk1ci$(this, new Kotlin.PropertyMetadata('gradientUnits'));
                },
                set: function (gradientUnits) {
                  this.gradientUnits$delegate.setValue_w32e13$(this, new Kotlin.PropertyMetadata('gradientUnits'), gradientUnits);
                }
              },
              offset: {
                get: function () {
                  return this.offset$delegate.getValue_dsk1ci$(this, new Kotlin.PropertyMetadata('offset'));
                },
                set: function (offset) {
                  this.offset$delegate.setValue_w32e13$(this, new Kotlin.PropertyMetadata('offset'), offset);
                }
              },
              points: {
                get: function () {
                  return this.points$delegate.getValue_dsk1ci$(this, new Kotlin.PropertyMetadata('points'));
                },
                set: function (points) {
                  this.points$delegate.setValue_w32e13$(this, new Kotlin.PropertyMetadata('points'), points);
                }
              },
              r: {
                get: function () {
                  return this.r$delegate.getValue_dsk1ci$(this, new Kotlin.PropertyMetadata('r'));
                },
                set: function (r) {
                  this.r$delegate.setValue_w32e13$(this, new Kotlin.PropertyMetadata('r'), r);
                }
              },
              rx: {
                get: function () {
                  return this.rx$delegate.getValue_dsk1ci$(this, new Kotlin.PropertyMetadata('rx'));
                },
                set: function (rx) {
                  this.rx$delegate.setValue_w32e13$(this, new Kotlin.PropertyMetadata('rx'), rx);
                }
              },
              ry: {
                get: function () {
                  return this.ry$delegate.getValue_dsk1ci$(this, new Kotlin.PropertyMetadata('ry'));
                },
                set: function (ry) {
                  this.ry$delegate.setValue_w32e13$(this, new Kotlin.PropertyMetadata('ry'), ry);
                }
              },
              spreadMethod: {
                get: function () {
                  return this.spreadMethod$delegate.getValue_dsk1ci$(this, new Kotlin.PropertyMetadata('spreadMethod'));
                },
                set: function (spreadMethod) {
                  this.spreadMethod$delegate.setValue_w32e13$(this, new Kotlin.PropertyMetadata('spreadMethod'), spreadMethod);
                }
              },
              stopColor: {
                get: function () {
                  return this.stopColor$delegate.getValue_dsk1ci$(this, new Kotlin.PropertyMetadata('stopColor'));
                },
                set: function (stopColor) {
                  this.stopColor$delegate.setValue_w32e13$(this, new Kotlin.PropertyMetadata('stopColor'), stopColor);
                }
              },
              stopOpacity: {
                get: function () {
                  return this.stopOpacity$delegate.getValue_dsk1ci$(this, new Kotlin.PropertyMetadata('stopOpacity'));
                },
                set: function (stopOpacity) {
                  this.stopOpacity$delegate.setValue_w32e13$(this, new Kotlin.PropertyMetadata('stopOpacity'), stopOpacity);
                }
              },
              stroke: {
                get: function () {
                  return this.stroke$delegate.getValue_dsk1ci$(this, new Kotlin.PropertyMetadata('stroke'));
                },
                set: function (stroke) {
                  this.stroke$delegate.setValue_w32e13$(this, new Kotlin.PropertyMetadata('stroke'), stroke);
                }
              },
              strokeLinecap: {
                get: function () {
                  return this.strokeLinecap$delegate.getValue_dsk1ci$(this, new Kotlin.PropertyMetadata('strokeLinecap'));
                },
                set: function (strokeLinecap) {
                  this.strokeLinecap$delegate.setValue_w32e13$(this, new Kotlin.PropertyMetadata('strokeLinecap'), strokeLinecap);
                }
              },
              strokeWidth: {
                get: function () {
                  return this.strokeWidth$delegate.getValue_dsk1ci$(this, new Kotlin.PropertyMetadata('strokeWidth'));
                },
                set: function (strokeWidth) {
                  this.strokeWidth$delegate.setValue_w32e13$(this, new Kotlin.PropertyMetadata('strokeWidth'), strokeWidth);
                }
              },
              transform: {
                get: function () {
                  return this.transform$delegate.getValue_dsk1ci$(this, new Kotlin.PropertyMetadata('transform'));
                },
                set: function (transform) {
                  this.transform$delegate.setValue_w32e13$(this, new Kotlin.PropertyMetadata('transform'), transform);
                }
              },
              version: {
                get: function () {
                  return this.version$delegate.getValue_dsk1ci$(this, new Kotlin.PropertyMetadata('version'));
                },
                set: function (version) {
                  this.version$delegate.setValue_w32e13$(this, new Kotlin.PropertyMetadata('version'), version);
                }
              },
              viewBox: {
                get: function () {
                  return this.viewBox$delegate.getValue_dsk1ci$(this, new Kotlin.PropertyMetadata('viewBox'));
                },
                set: function (viewBox) {
                  this.viewBox$delegate.setValue_w32e13$(this, new Kotlin.PropertyMetadata('viewBox'), viewBox);
                }
              },
              x1: {
                get: function () {
                  return this.x1$delegate.getValue_dsk1ci$(this, new Kotlin.PropertyMetadata('x1'));
                },
                set: function (x1) {
                  this.x1$delegate.setValue_w32e13$(this, new Kotlin.PropertyMetadata('x1'), x1);
                }
              },
              x2: {
                get: function () {
                  return this.x2$delegate.getValue_dsk1ci$(this, new Kotlin.PropertyMetadata('x2'));
                },
                set: function (x2) {
                  this.x2$delegate.setValue_w32e13$(this, new Kotlin.PropertyMetadata('x2'), x2);
                }
              },
              x: {
                get: function () {
                  return this.x$delegate.getValue_dsk1ci$(this, new Kotlin.PropertyMetadata('x'));
                },
                set: function (x) {
                  this.x$delegate.setValue_w32e13$(this, new Kotlin.PropertyMetadata('x'), x);
                }
              },
              y1: {
                get: function () {
                  return this.y1$delegate.getValue_dsk1ci$(this, new Kotlin.PropertyMetadata('y1'));
                },
                set: function (y1) {
                  this.y1$delegate.setValue_w32e13$(this, new Kotlin.PropertyMetadata('y1'), y1);
                }
              },
              y2: {
                get: function () {
                  return this.y2$delegate.getValue_dsk1ci$(this, new Kotlin.PropertyMetadata('y2'));
                },
                set: function (y2) {
                  this.y2$delegate.setValue_w32e13$(this, new Kotlin.PropertyMetadata('y2'), y2);
                }
              },
              y: {
                get: function () {
                  return this.y$delegate.getValue_dsk1ci$(this, new Kotlin.PropertyMetadata('y'));
                },
                set: function (y) {
                  this.y$delegate.setValue_w32e13$(this, new Kotlin.PropertyMetadata('y'), y);
                }
              }
            }),
            LogLevel: Kotlin.createClass(null, function (ordinal) {
              this.ordinal = ordinal;
            }, null, /** @lends _.com.github.andrewoma.react.LogLevel */ {
              object_initializer$: function () {
                return Kotlin.createObject(null, function () {
                  this.debug = new _.com.github.andrewoma.react.LogLevel(1);
                  this.info = new _.com.github.andrewoma.react.LogLevel(2);
                  this.warn = new _.com.github.andrewoma.react.LogLevel(3);
                  this.error = new _.com.github.andrewoma.react.LogLevel(4);
                  this.none = new _.com.github.andrewoma.react.LogLevel(5);
                }, {
                  parse_61zpoe$: function (value) {
                    var tmp$0;
                    if (value === 'debug')
                      tmp$0 = this.debug;
                    else if (value === 'info')
                      tmp$0 = this.info;
                    else if (value === 'warn')
                      tmp$0 = this.warn;
                    else if (value === 'error')
                      tmp$0 = this.error;
                    else if (value === 'none')
                      tmp$0 = this.none;
                    else
                      throw new Kotlin.Exception("Unknown log level: '" + value + "'");
                    return tmp$0;
                  }
                });
              }
            }),
            Log: Kotlin.createClass(null, function (logLevel) {
              this.logLevel = logLevel;
            }, /** @lends _.com.github.andrewoma.react.Log.prototype */ {
              debug_9mqe4v$: function (objects) {
                if (_.com.github.andrewoma.react.LogLevel.object.debug.ordinal >= this.logLevel.ordinal) {
                  var tmp$0;
                  (tmp$0 = console).info.apply(tmp$0, objects);
                }
              },
              info_9mqe4v$: function (objects) {
                if (_.com.github.andrewoma.react.LogLevel.object.info.ordinal >= this.logLevel.ordinal) {
                  var tmp$0;
                  (tmp$0 = console).info.apply(tmp$0, objects);
                }
              },
              warn_9mqe4v$: function (objects) {
                if (_.com.github.andrewoma.react.LogLevel.object.warn.ordinal >= this.logLevel.ordinal) {
                  var tmp$0;
                  (tmp$0 = console).warn.apply(tmp$0, objects);
                }
              },
              error_9mqe4v$: function (objects) {
                if (_.com.github.andrewoma.react.LogLevel.object.error.ordinal >= this.logLevel.ordinal) {
                  var tmp$0;
                  (tmp$0 = console).error.apply(tmp$0, objects);
                }
              },
              logIfEnabled: function (level, f) {
                if (level.ordinal >= this.logLevel.ordinal)
                  f();
              }
            }, /** @lends _.com.github.andrewoma.react.Log */ {
            }),
            logLevelFromLocation: function (location) {
              var tmp$0, tmp$1, tmp$2;
              var prefix = 'log-level=';
              tmp$0 = Kotlin.copyToArray(Kotlin.modules['stdlib'].kotlin.text.split_nhz2th$(location, Kotlin.modules['stdlib'].kotlin.text.toRegex_pdl1w0$('[?&]'))), tmp$1 = tmp$0.length;
              for (var tmp$2 = 0; tmp$2 !== tmp$1; ++tmp$2) {
                var token = tmp$0[tmp$2];
                if (Kotlin.modules['stdlib'].kotlin.text.startsWith_41xvrb$(token, prefix))
                  return _.com.github.andrewoma.react.LogLevel.object.parse_61zpoe$(token.substring(prefix.length));
              }
              return _.com.github.andrewoma.react.LogLevel.object.none;
            },
            React: Kotlin.createClass(null, null, /** @lends _.com.github.andrewoma.react.React.prototype */ {
              createFactory_oqkx6a$: function (spec) {
                return Reakt.createClass(spec);
              },
              render_vbpb6g$: function (component, container, callback) {
                if (callback === void 0)
                  callback = _.com.github.andrewoma.react.React.render_vbpb6g$f;
                return ReactDOM.render(component, container, callback);
              },
              createElement_951m7x$: function (reactComponent, prop, children) {
                return React.createElement(reactComponent, prop, children);
              }
            }, /** @lends _.com.github.andrewoma.react.React */ {
              render_vbpb6g$f: function () {
              }
            })
          }),
          flux: Kotlin.definePackage(null, /** @lends _.com.github.andrewoma.flux */ {
            Store: Kotlin.createClass(null, function () {
              this.changeListeners_cgy4c3$ = Kotlin.modules['stdlib'].kotlin.collections.hashMapOf_eoa9s7$([]);
            }, /** @lends _.com.github.andrewoma.flux.Store.prototype */ {
              addChangeListener_o7wwlr$: function (self, callback) {
                this.changeListeners_cgy4c3$.put_wn2jw4$(self, callback);
              },
              emitChange: function () {
                var $receiver = this.changeListeners_cgy4c3$.values;
                var tmp$0;
                tmp$0 = $receiver.iterator();
                while (tmp$0.hasNext()) {
                  var element = tmp$0.next();
                  element();
                }
              },
              removeListener_za3rmp$: function (self) {
                this.changeListeners_cgy4c3$.remove_za3rmp$(self);
              }
            }, /** @lends _.com.github.andrewoma.flux.Store */ {
            }),
            ActionDef: Kotlin.createClass(null, function (dispatcher) {
              this.dispatcher = dispatcher;
            }, /** @lends _.com.github.andrewoma.flux.ActionDef.prototype */ {
              invoke_za3rmp$: function (payload) {
                this.dispatcher.dispatch_qosh0o$(this, payload);
              }
            }),
            ActionHandlers: Kotlin.createClass(null, function (handlers) {
              if (handlers === void 0)
                handlers = Kotlin.modules['stdlib'].kotlin.collections.arrayListOf_9mqe4v$([]);
              this.handlers = handlers;
            }),
            RegisteredActionHandler: Kotlin.createClass(null, function (store, actionDef, callback) {
              this.store = store;
              this.actionDef = actionDef;
              this.callback = callback;
              this.pending = false;
              this.handled = false;
            }),
            DispatchCallbackBody: Kotlin.createClass(null, function (dispatcher, store) {
              this.dispatcher = dispatcher;
              this.store = store;
            }, /** @lends _.com.github.andrewoma.flux.DispatchCallbackBody.prototype */ {
              waitFor_h2e3es$: function (registeredActionHandlers) {
                this.dispatcher.waitFor_h2e3es$(registeredActionHandlers);
              }
            }),
            Dispatcher: Kotlin.createClass(null, function () {
              this.pendingPayload_iw4jan$ = null;
              this.pendingActionDef_nael9s$ = null;
              this.actionHandlersList_e849th$ = Kotlin.modules['stdlib'].kotlin.collections.hashMapOf_eoa9s7$([]);
              this.dispatching_s6t2sw$ = false;
            }, /** @lends _.com.github.andrewoma.flux.Dispatcher.prototype */ {
              register_xztz3k$: function (store, action, callback) {
                var $receiver = this.actionHandlersList_e849th$;
                var tmp$0;
                var value = $receiver.get_za3rmp$(action);
                if (value == null && !$receiver.containsKey_za3rmp$(action)) {
                  var answer = new _.com.github.andrewoma.flux.ActionHandlers();
                  $receiver.put_wn2jw4$(action, answer);
                  tmp$0 = answer;
                }
                 else {
                  tmp$0 = value;
                }
                var actionHandlers = tmp$0;
                var registeredActionHandler = new _.com.github.andrewoma.flux.RegisteredActionHandler(store, action, callback);
                actionHandlers.handlers.add_za3rmp$(registeredActionHandler);
                return registeredActionHandler;
              },
              unRegister_slpl22$: function (registeredActionHandler) {
                var tmp$0, tmp$1;
                (tmp$1 = (tmp$0 = this.actionHandlersList_e849th$.get_za3rmp$(registeredActionHandler.actionDef)) != null ? tmp$0.handlers : null) != null ? tmp$1.remove_za3rmp$(registeredActionHandler) : null;
              },
              waitFor_h2e3es$: function (stores) {
                var tmp$0;
                var value = this.dispatching_s6t2sw$;
                if (!value) {
                  var message = 'Dispatcher.waitFor(...): Must be invoked while dispatching.';
                  throw new Kotlin.IllegalArgumentException(message.toString());
                }
                var handlersForCurrentAction = Kotlin.modules['stdlib'].kotlin.collections.orEmpty_fvq2g0$((tmp$0 = Kotlin.modules['stdlib'].kotlin.collections.get_qbyksu$(this.actionHandlersList_e849th$, this.pendingActionDef_nael9s$)) != null ? tmp$0.handlers : null);
                var destination = new Kotlin.ArrayList();
                var tmp$2;
                tmp$2 = handlersForCurrentAction.iterator();
                while (tmp$2.hasNext()) {
                  var element = tmp$2.next();
                  if (Kotlin.modules['stdlib'].kotlin.collections.contains_ke19y6$(stores, element.store)) {
                    destination.add_za3rmp$(element);
                  }
                }
                var tmp$3;
                var first = new Kotlin.ArrayList();
                var second = new Kotlin.ArrayList();
                tmp$3 = destination.iterator();
                while (tmp$3.hasNext()) {
                  var element_0 = tmp$3.next();
                  if (element_0.pending || element_0.handled) {
                    first.add_za3rmp$(element_0);
                  }
                   else {
                    second.add_za3rmp$(element_0);
                  }
                }
                var tmp$1 = new Kotlin.modules['stdlib'].kotlin.Pair(first, second)
                , pendingHandlers = tmp$1.component1()
                , nonPendingHandlers = tmp$1.component2();
                var unhandledHandlers;
                firstOrNull_azvtw4$break: {
                  var tmp$4;
                  tmp$4 = pendingHandlers.iterator();
                  while (tmp$4.hasNext()) {
                    var element_1 = tmp$4.next();
                    if (!element_1.handled) {
                      unhandledHandlers = element_1;
                      break firstOrNull_azvtw4$break;
                    }
                  }
                  unhandledHandlers = null;
                }
                var value_0 = unhandledHandlers == null;
                if (!value_0) {
                  var message_0 = 'Dispatcher.waitFor(...): Circular dependency detected while waiting for ' + Kotlin.toString(unhandledHandlers) + '.';
                  throw new Kotlin.IllegalArgumentException(message_0.toString());
                }
                var action = _.com.github.andrewoma.flux.Dispatcher.waitFor_h2e3es$f_4(this);
                var tmp$5;
                tmp$5 = nonPendingHandlers.iterator();
                while (tmp$5.hasNext()) {
                  var element_2 = tmp$5.next();
                  action(element_2);
                }
              },
              dispatch_qosh0o$: function (action, payload) {
                var tmp$0, tmp$1;
                var value = !this.dispatching_s6t2sw$;
                if (!value) {
                  var message = 'Dispatch.dispatch(...): Cannot dispatch in the middle of a dispatch.';
                  throw new Kotlin.IllegalArgumentException(message.toString());
                }
                this.startDispatching(action, payload);
                try {
                  (tmp$1 = (tmp$0 = this.actionHandlersList_e849th$.get_za3rmp$(action)) != null ? tmp$0.handlers : null) != null ? Kotlin.modules['stdlib'].kotlin.collections.forEach_p7e0bo$(tmp$1, _.com.github.andrewoma.flux.Dispatcher.dispatch_qosh0o$f_0(this)) : null;
                }
                finally {
                  this.stopDispatching();
                }
              },
              invokeCallback: function (it) {
                it.pending = true;
                var body = new _.com.github.andrewoma.flux.DispatchCallbackBody(this, it.store);
                var callback = it.callback;
                callback.call(body, this.pendingPayload_iw4jan$);
                it.handled = true;
              },
              startDispatching: function (action, payload) {
                var tmp$0, tmp$1;
                (tmp$1 = (tmp$0 = this.actionHandlersList_e849th$.get_za3rmp$(action)) != null ? tmp$0.handlers : null) != null ? Kotlin.modules['stdlib'].kotlin.collections.forEach_p7e0bo$(tmp$1, _.com.github.andrewoma.flux.Dispatcher.startDispatching$f) : null;
                this.pendingPayload_iw4jan$ = payload;
                this.pendingActionDef_nael9s$ = action;
                this.dispatching_s6t2sw$ = true;
              },
              stopDispatching: function () {
                this.pendingActionDef_nael9s$ = null;
                this.pendingPayload_iw4jan$ = null;
                this.dispatching_s6t2sw$ = false;
              }
            }, /** @lends _.com.github.andrewoma.flux.Dispatcher */ {
              waitFor_h2e3es$f_4: function (this$Dispatcher) {
                return function (it) {
                  var tmp$0, tmp$1, tmp$2;
                  var value = (tmp$2 = (tmp$1 = (tmp$0 = this$Dispatcher.actionHandlersList_e849th$.get_za3rmp$(it.actionDef)) != null ? tmp$0.handlers : null) != null ? tmp$1.contains_za3rmp$(it) : null) != null ? tmp$2 : false;
                  if (!value) {
                    var message = 'Dispatcher.waitFor(...): ' + it + ' does not map to a registered callback.';
                    throw new Kotlin.IllegalArgumentException(message.toString());
                  }
                  this$Dispatcher.invokeCallback(it);
                };
              },
              dispatch_qosh0o$f_0: function (this$Dispatcher) {
                return function (it) {
                  if (!it.pending) {
                    this$Dispatcher.invokeCallback(it);
                  }
                };
              },
              startDispatching$f: function (it) {
                it.pending = false;
                it.handled = false;
              }
            })
          })
        })
      })
    })
  });
  Kotlin.defineModule('reakt', _);
  _.todo.main_kand9s$([]);
}(Kotlin));
