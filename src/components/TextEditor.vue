<template>
  <div>
    <div v-if="editor" class="menu">
      <button
        @click.stop.prevent="editor.chain().focus().toggleBold().run()"
        :class="{ 'is-active': editor.isActive('bold') }"
      >
        <i class="fas fa-bold"></i>
      </button>
      <button
        @click.stop.prevent="editor.chain().focus().toggleItalic().run()"
        :class="{ 'is-active': editor.isActive('italic') }"
      >
        <i class="fas fa-italic"></i>
      </button>
      <button
        @click.stop.prevent="editor.chain().focus().toggleStrike().run()"
        :class="{ 'is-active': editor.isActive('strike') }"
      >
        <i class="fas fa-strikethrough"></i>
      </button>
      <button
        v-if="false"
        @click.stop.prevent="editor.chain().focus().toggleCode().run()"
        :class="{ 'is-active': editor.isActive('code') }"
      >
        code
      </button>
      <button
        @click.stop.prevent="editor.chain().focus().unsetAllMarks().run()"
      >
        <i class="fas fa-remove-format"></i>
      </button>
      <button
        v-if="false"
        @click.stop.prevent="editor.chain().focus().clearNodes().run()"
      >
        <i class="fas fa-remove-format"></i>
      </button>
      <button
        v-if="false"
        @click.stop.prevent="editor.chain().focus().setParagraph().run()"
        :class="{ 'is-active': editor.isActive('paragraph') }"
      >
        <i class="fas fa-paragraph"></i>
      </button>
      <button
        v-if="false"
        @click.stop.prevent="
          editor.chain().focus().toggleHeading({ level: 1 }).run()
        "
        :class="{ 'is-active': editor.isActive('heading', { level: 1 }) }"
      >
        h1
      </button>
      <button
        v-if="false"
        @click.stop.prevent="
          editor.chain().focus().toggleHeading({ level: 2 }).run()
        "
        :class="{ 'is-active': editor.isActive('heading', { level: 2 }) }"
      >
        h2
      </button>
      <button
        v-if="false"
        @click.stop.prevent="
          editor.chain().focus().toggleHeading({ level: 3 }).run()
        "
        :class="{ 'is-active': editor.isActive('heading', { level: 3 }) }"
      >
        h3
      </button>
      <button
        v-if="false"
        @click.stop.prevent="
          editor.chain().focus().toggleHeading({ level: 4 }).run()
        "
        :class="{ 'is-active': editor.isActive('heading', { level: 4 }) }"
      >
        h4
      </button>
      <button
        v-if="false"
        @click.stop.prevent="
          editor.chain().focus().toggleHeading({ level: 5 }).run()
        "
        :class="{ 'is-active': editor.isActive('heading', { level: 5 }) }"
      >
        h5
      </button>
      <button
        v-if="false"
        @click.stop.prevent="
          editor.chain().focus().toggleHeading({ level: 6 }).run()
        "
        :class="{ 'is-active': editor.isActive('heading', { level: 6 }) }"
      >
        h6
      </button>
      <button
        v-if="false"
        @click.stop.prevent="editor.chain().focus().toggleBulletList().run()"
        :class="{ 'is-active': editor.isActive('bulletList') }"
      >
        <i class="fas fa-list"></i>
      </button>
      <button
        v-if="false"
        @click.stop.prevent="editor.chain().focus().toggleOrderedList().run()"
        :class="{ 'is-active': editor.isActive('orderedList') }"
      >
        <i class="fas fa-list-ol"></i>
      </button>
      <button
        v-if="false"
        @click.stop.prevent="editor.chain().focus().toggleCodeBlock().run()"
        :class="{ 'is-active': editor.isActive('codeBlock') }"
      >
        code block
      </button>
      <button
        v-if="false"
        @click.stop.prevent="editor.chain().focus().toggleBlockquote().run()"
        :class="{ 'is-active': editor.isActive('blockquote') }"
      >
        blockquote
      </button>
      <button
        title="Linha Horizontal"
        @click.stop.prevent="editor.chain().focus().setHorizontalRule().run()"
      >
        _
      </button>
      <button
        v-if="false"
        @click.stop.prevent="editor.chain().focus().setHardBreak().run()"
      >
        hard break
      </button>
      <button
        v-if="false"
        @click.stop.prevent="editor.chain().focus().undo().run()"
      >
        undo
      </button>
      <button
        v-if="false"
        @click.stop.prevent="editor.chain().focus().redo().run()"
      >
        redo
      </button>
      <button
        @click.stop.prevent="setLink"
        :class="{ 'is-active': editor.isActive('link') }"
      >
        <i class="fas fa-link"></i>
      </button>
      <button
        @click.stop.prevent="editor.chain().focus().unsetLink().run()"
        v-if="editor.isActive('link')"
      >
        <i class="fas fa-unlink"></i>
      </button>
    </div>
    <editor-content :editor="editor" class="editor" />
  </div>
</template>

<script>
import { Editor, EditorContent } from "@tiptap/vue-3";
import StarterKit from "@tiptap/starter-kit";
import HardBreak from "@tiptap/extension-hard-break";
import Link from "@tiptap/extension-link";

export default {
  components: {
    EditorContent,
  },

  props: {
    modelValue: Array,
  },

  data() {
    return {
      editor: null,
      debounceTimer: null,
      html: null
    };
  },

  watch: {
    modelValue(newValue) {

      const newValueJoin = newValue.join('')
      if(this.html !== newValueJoin) {
        this.editor.commands.setContent(newValueJoin)
      }
    },
  },

  methods: {
    setLink() {
      const url = window.prompt("URL");

      this.editor
        .chain()
        .focus()
        .extendMarkRange("link")
        .setLink({ href: url })
        .run();
    },
  },

  mounted() {
    this.editor = new Editor({
      content: (this.modelValue || []) /*.map((v) => `<p>${v}</p>`)*/
        .join(""),
      extensions: [
        StarterKit,
        Link.extend({
          addOptions() {
            return {
              ...Link.options,
              openOnClick: false
            }
          }
        }),
        HardBreak.extend({
          addKeyboardShortcuts() {
            return {
              Enter: () => this.editor.commands.setHardBreak(),
            };
          },
        }),
      ],
      onUpdate: ({ editor }) => {
        clearTimeout(this.debounceTimer);
        this.debounceTimer = setTimeout(() => {

          this.html = editor.getHTML();

          this.$emit("update:modelValue", [this.html]);
          this.$emit("change");
        }, 1000);
      },
    });
  },

  beforeUnmount() {
    this.editor.destroy();
  },
};
</script>
<style scoped>
.menu button {
  width: 40px;
  margin-right: 2px;
}
.menu button.is-active {
  background: black;
  color: white;
}
.editor {
  border: 1px solid #ccc;
}

>>> .ProseMirror {
  padding: 10px;
}
</style>