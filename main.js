const tree = [
  {
    type: "folder",
    name: "src",
    children: [
      {
        type: "folder",
        name: "components",
        children: [
          { type: "file", name: "Header.js" },
          { type: "file", name: "Footer.js" },
        ],
      },
      { type: "file", name: "index.js" },
    ],
  },
  {
    type: "folder",
    name: "README.md",
    children: [
      {
        type: "folder",
        name: "sth1",
        children: [
          {
            type: "file",
            name: "sthFile1.1",
          },

          {
            type: "file",
            name: "sthFile1.2",
          },
        ],
      },
    ],
  },
  {
    type: "folder",
    name: "README.md",
    children: [
      {
        type: "folder",
        name: "sth2",
        children: [
          {
            type: "file",
            name: "sthFile2.1",
          },

          {
            type: "file",
            name: "sthFile2.2",
          },
        ],
      },
    ],
  },
  {
    type: "folder",
    name: "README.md",
    children: [
      {
        type: "folder",
        name: "sth3",
        children: [
          {
            type: "file",
            name: "sthFile3.1",
          },

          {
            type: "file",
            name: "sthFile3.2",
          },
        ],
      },
    ],
  },
  {
    type: "folder",
    name: "README.md",
    children: [
      {
        type: "folder",
        name: "sth4",
        children: [
          {
            type: "file",
            name: "sthFile4.1",
          },

          {
            type: "file",
            name: "sthFile4.2",
          },
        ],
      },
    ],
  },

  {
    type: "folder",
    name: "src",
    children: [
      {
        type: "folder",
        name: "components",
        children: [
          { type: "file", name: "Header.js" },
          { type: "file", name: "Footer.js" },
        ],
      },
      { type: "file", name: "index.js" },
    ],
  },

  {
    type: "folder",
    name: "src",
    children: [
      {
        type: "folder",
        name: "components",
        children: [
          { type: "file", name: "Header.js" },
          { type: "file", name: "Footer.js" },
        ],
      },
      { type: "file", name: "index.js" },
    ],
  },

  {
    type: "folder",
    name: "src",
    children: [
      {
        type: "folder",
        name: "components",
        children: [
          { type: "file", name: "Header.js" },
          { type: "file", name: "Footer.js" },
        ],
      },
      { type: "file", name: "index.js" },
    ],
  },

  {
    type: "folder",
    name: "src",
    children: [
      {
        type: "folder",
        name: "components",
        children: [
          { type: "file", name: "Header.js" },
          { type: "file", name: "Footer.js" },
        ],
      },
      { type: "file", name: "index.js" },
    ],
  },

  {
    type: "folder",
    name: "src",
    children: [
      {
        type: "folder",
        name: "components",
        children: [
          { type: "file", name: "Header.js" },
          { type: "file", name: "Footer.js" },
          { type: "folder", name: "sth" },
        ],
      },
      { type: "file", name: "index.js" },
    ],
  },
];

const rootPath = document.querySelector(".root");
const contextMenu = document.querySelector(".context-menu");
const overlay = document.querySelector(".overlay");
const renameBtn = document.querySelector("#rename");
const deleteBtn = document.querySelector("#delete");

const renderRoot = (root, parent, folderParent = null) => {
  for (let component of root) {
    if (component.type === "file") {
      const file = document.createElement("li");
      file.dataset.type = component.type;
      file.className = "file";
      const fileName = document.createElement("a");
      fileName.href = "#!";
      fileName.textContent = component.name;
      file.appendChild(fileName);
      parent.appendChild(file);
    } else {
      const sub = document.createElement("ul");
      folderParent = document.createElement("li");
      folderParent.dataset.type = component.type;
      folderParent.className = "folder";
      const icon = document.createElement("i");
      icon.classList.add("fa-solid", "fa-chevron-right");
      const nameFolder = document.createElement("a");
      nameFolder.href = "#!";
      nameFolder.textContent = component.name;
      folderParent.append(icon, nameFolder, sub);
      parent.append(folderParent);

      sub.onclick = (e) => {
        e.stopPropagation();
      };

      folderParent.onclick = (e) => {
        e.stopPropagation();

        if (e.target.closest(".folder")) {
          sub.classList.toggle("clicked");
          icon.classList.toggle("rotate");
        }
      };

      folderParent.oncontextmenu = (e) => {
        e.preventDefault();

        const currentName = e.target.closest("a");
        if (!currentName) return;
        const currentItem = e.target.closest("li");
        if (!currentItem) return;

        const top = e.clientY;
        const left = e.clientX;
        contextMenu.style = `top: ${top}px; left: ${left}px; display: block`;

        renameBtn.onclick = () => {
          const currentContent = currentName.textContent;
          const input = document.createElement("input");
          input.type = "text";
          input.value = currentContent;
          setTimeout(() => {
            input.focus();
            input.select();
          });

          currentItem.replaceChild(input, currentName);

          currentName.remove();

          const newValue = document.createElement("a");
          newValue.href = "#!";

          input.onblur = (e) => {
            newValue.textContent = e.target.value;

            currentItem.replaceChild(newValue, input);
            input.remove();
          };
        };

        deleteBtn.onclick = () => {
          currentItem.remove();
        };
      };

      document.onclick = () => {
        contextMenu.style = "none";
      };

      if (component.children) {
        renderRoot(component.children, sub, parent);
      }
    }
  }
};

renderRoot(tree, rootPath);
