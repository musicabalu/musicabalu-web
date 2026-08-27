'use client';
import { useEffect, useRef } from 'react';
import styles from './cronograma.module.css';

export default function CronogramaClient({ styles: htmlStyles, body }) {
  const contentRef = useRef(null);
  const saveBtnRef = useRef(null);
  const msgRef = useRef(null);

  useEffect(() => {
    if (!contentRef.current) return;
    const container = contentRef.current;
    
    // Prevent double execution in Strict Mode
    if (container.dataset.initialized === 'true') return;
    container.dataset.initialized = 'true';

    // 1. Convert to Accordion by Months
    const h3s = Array.from(container.querySelectorAll('h3'));
    
    const date = new Date();
    const monthsEs = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
    const currentMonthName = monthsEs[date.getMonth()];
    
    let activeH3 = null;

    h3s.forEach((h3) => {
      const contentDiv = document.createElement('div');
      contentDiv.style.display = 'none';
      contentDiv.style.paddingTop = '10px';
      
      let sibling = h3.nextSibling;
      while (sibling && sibling.nodeName.toLowerCase() !== 'h3') {
        const nextSibling = sibling.nextSibling;
        contentDiv.appendChild(sibling);
        sibling = nextSibling;
      }
      
      h3.style.cursor = 'pointer';
      h3.style.padding = '15px';
      h3.style.backgroundColor = '#f8fafc';
      h3.style.border = '1px solid #e2e8f0';
      h3.style.borderRadius = '8px';
      h3.style.display = 'flex';
      h3.style.justifyContent = 'space-between';
      h3.style.alignItems = 'center';
      h3.style.marginTop = '20px';
      h3.style.userSelect = 'none';
      
      const icon = document.createElement('span');
      icon.innerHTML = '▼';
      icon.style.fontSize = '0.9rem';
      icon.style.transition = 'transform 0.2s';
      h3.appendChild(icon);

      h3.parentNode.insertBefore(contentDiv, h3.nextSibling);

      h3.addEventListener('click', () => {
        const isOpen = contentDiv.style.display === 'block';
        contentDiv.style.display = isOpen ? 'none' : 'block';
        icon.style.transform = isOpen ? 'rotate(0deg)' : 'rotate(180deg)';
        h3.style.backgroundColor = isOpen ? '#f8fafc' : '#e0f2fe';
        h3.style.borderColor = isOpen ? '#e2e8f0' : '#bae6fd';
      });

      if (h3.textContent.toLowerCase().includes(currentMonthName)) {
        activeH3 = h3;
      }
    });

    if (!activeH3 && h3s.length > 0) activeH3 = h3s[0];
    if (activeH3) {
      activeH3.click();
    }

    // 2. Add Interactive Checkboxes and Edit functionality
    const uls = container.querySelectorAll('ul.checklist');
    
    const markUnsaved = () => {
      if (saveBtnRef.current) {
        saveBtnRef.current.classList.add(styles.saveButtonActive);
        saveBtnRef.current.innerHTML = '💾 Guardar Cambios';
      }
    };

    uls.forEach((ul, ulIndex) => {
      ul.dataset.ulIndex = ulIndex;
      ul.style.paddingBottom = '10px';
      
      const lis = Array.from(ul.querySelectorAll('li'));
      lis.forEach((li, i) => {
        const originalText = li.textContent.trim();
        const key = `check_${originalText.substring(0, 30).replace(/\s/g, '_')}_crono_${i}`;
        li.dataset.storageKey = key;
        li.dataset.isBaseline = 'true';
        
        const isChecked = localStorage.getItem(key) === 'true';
        const editedText = localStorage.getItem(`edited_text_${key}`);
        const currentHtml = editedText !== null ? editedText : li.innerHTML;
        
        setupLiDOM(li, currentHtml, isChecked, markUnsaved, true);
      });

      // Load new tasks
      const newTasksJson = localStorage.getItem(`new_tasks_ul_${ulIndex}`);
      if (newTasksJson) {
        try {
          const newTasks = JSON.parse(newTasksJson);
          newTasks.forEach(task => {
            const li = document.createElement('li');
            li.dataset.taskId = task.id;
            li.dataset.isBaseline = 'false';
            setupLiDOM(li, task.text, task.checked, markUnsaved, false);
            ul.appendChild(li);
          });
        } catch(e) {}
      }

      // Add "Nueva tarea" button
      const addBtnWrapper = document.createElement('div');
      addBtnWrapper.style.marginTop = '10px';
      addBtnWrapper.style.marginLeft = '10px';
      
      const addBtn = document.createElement('button');
      addBtn.innerHTML = '➕ Añadir tarea';
      addBtn.style.background = 'none';
      addBtn.style.border = 'none';
      addBtn.style.color = '#00B2E3';
      addBtn.style.cursor = 'pointer';
      addBtn.style.fontSize = '0.95rem';
      addBtn.style.fontWeight = '700';
      
      addBtn.addEventListener('click', () => {
        const text = prompt('Escribe la nueva tarea:');
        if (text && text.trim()) {
          const li = document.createElement('li');
          li.dataset.taskId = 'task_' + Date.now();
          li.dataset.isBaseline = 'false';
          setupLiDOM(li, text.trim(), false, markUnsaved, false);
          ul.appendChild(li);
          markUnsaved();
        }
      });
      
      addBtnWrapper.appendChild(addBtn);
      ul.parentNode.insertBefore(addBtnWrapper, ul.nextSibling);

      // Restore custom order if saved
      const savedOrderJson = localStorage.getItem(`order_ul_${ulIndex}`);
      if (savedOrderJson) {
        try {
          const savedOrder = JSON.parse(savedOrderJson);
          const allLis = Array.from(ul.querySelectorAll('li'));
          savedOrder.forEach(id => {
            const li = allLis.find(l => (l.dataset.storageKey === id || l.dataset.taskId === id));
            if (li) {
              ul.appendChild(li);
            }
          });
        } catch(e) {}
      }
    });

    function setupLiDOM(li, textContentHtml, isChecked, onModify, isBaseline) {
      li.innerHTML = '';
      li.style.listStyle = 'none';
      li.style.display = 'flex';
      li.style.alignItems = 'flex-start';
      li.style.gap = '12px';
      
      const cb = document.createElement('input');
      cb.type = 'checkbox';
      cb.checked = isChecked;
      cb.className = 'crono-checkbox'; 
      cb.style.marginTop = '4px';
      cb.style.transform = 'scale(1.4)';
      cb.style.flexShrink = '0';
      cb.style.accentColor = 'var(--pink, #F4436C)';
      cb.style.cursor = 'pointer';
      
      const contentSpan = document.createElement('span');
      contentSpan.className = 'crono-text';
      contentSpan.innerHTML = textContentHtml;
      contentSpan.style.flex = '1';
      contentSpan.style.cursor = 'pointer';
      
      const actionsDiv = document.createElement('div');
      actionsDiv.style.display = 'flex';
      actionsDiv.style.gap = '10px';
      actionsDiv.style.opacity = '0';
      actionsDiv.style.transition = 'opacity 0.2s';
      
      const upBtn = document.createElement('button');
      upBtn.innerHTML = '⬆️';
      upBtn.style.background = 'none';
      upBtn.style.border = 'none';
      upBtn.style.cursor = 'pointer';
      upBtn.title = 'Mover arriba';
      upBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (li.previousElementSibling) {
          li.parentNode.insertBefore(li, li.previousElementSibling);
          onModify();
        }
      });
      
      const downBtn = document.createElement('button');
      downBtn.innerHTML = '⬇️';
      downBtn.style.background = 'none';
      downBtn.style.border = 'none';
      downBtn.style.cursor = 'pointer';
      downBtn.title = 'Mover abajo';
      downBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (li.nextElementSibling) {
          li.parentNode.insertBefore(li.nextElementSibling, li);
          onModify();
        }
      });
      
      const editBtn = document.createElement('button');
      editBtn.innerHTML = '✏️';
      editBtn.style.background = 'none';
      editBtn.style.border = 'none';
      editBtn.style.cursor = 'pointer';
      editBtn.title = 'Editar tarea';
      
      editBtn.addEventListener('click', () => {
        const newText = prompt('Editar tarea:', contentSpan.innerText);
        if (newText !== null && newText.trim() !== '') {
          contentSpan.innerText = newText.trim();
          onModify();
        }
      });
      
      const delBtn = document.createElement('button');
      delBtn.innerHTML = '🗑️';
      delBtn.style.background = 'none';
      delBtn.style.border = 'none';
      delBtn.style.cursor = 'pointer';
      delBtn.title = 'Eliminar tarea';
      
      delBtn.addEventListener('click', () => {
        if (confirm('¿Eliminar esta tarea?')) {
          li.style.display = 'none';
          li.dataset.deleted = 'true';
          onModify();
        }
      });
      
      actionsDiv.appendChild(upBtn);
      actionsDiv.appendChild(downBtn);
      actionsDiv.appendChild(editBtn);
      actionsDiv.appendChild(delBtn);
      
      li.addEventListener('mouseenter', () => actionsDiv.style.opacity = '1');
      li.addEventListener('mouseleave', () => actionsDiv.style.opacity = '0');

      const applyCheckedStyle = (checked) => {
        if (checked) {
          contentSpan.style.textDecoration = 'line-through';
          contentSpan.style.opacity = '0.5';
          li.style.background = '#f1f5f9';
        } else {
          contentSpan.style.textDecoration = 'none';
          contentSpan.style.opacity = '1';
          li.style.background = '#f8fafc';
        }
      };
      
      applyCheckedStyle(isChecked);
      
      // If previously deleted, hide it.
      if (li.dataset.deleted === 'true') {
        li.style.display = 'none';
      } else if (isBaseline && localStorage.getItem(`deleted_${li.dataset.storageKey}`) === 'true') {
        li.style.display = 'none';
        li.dataset.deleted = 'true';
      }
      
      cb.addEventListener('change', (e) => {
         applyCheckedStyle(e.target.checked);
         onModify();
      });

      // Quick toggle by clicking text
      contentSpan.addEventListener('click', () => {
         cb.checked = !cb.checked;
         applyCheckedStyle(cb.checked);
         onModify();
      });
      
      li.appendChild(cb);
      li.appendChild(contentSpan);
      li.appendChild(actionsDiv);
    }

  }, [body, styles.saveButtonActive]);

  const handleSave = () => {
    if (!contentRef.current) return;
    const container = contentRef.current;
    
    const uls = container.querySelectorAll('ul.checklist');
    
    uls.forEach((ul) => {
      const ulIndex = ul.dataset.ulIndex;
      const lis = Array.from(ul.querySelectorAll('li'));
      const newTasks = [];
      
      lis.forEach((li) => {
        const isBaseline = li.dataset.isBaseline === 'true';
        const cb = li.querySelector('.crono-checkbox');
        const textSpan = li.querySelector('.crono-text');
        if (!cb || !textSpan) return;

        const isDeleted = li.dataset.deleted === 'true';
        const isChecked = cb.checked;
        
        if (isBaseline) {
          const key = li.dataset.storageKey;
          localStorage.setItem(key, isChecked);
          if (isDeleted) {
             localStorage.setItem(`deleted_${key}`, 'true');
          } else {
             localStorage.removeItem(`deleted_${key}`);
             localStorage.setItem(`edited_text_${key}`, textSpan.innerHTML);
          }
        } else {
          if (!isDeleted) {
            newTasks.push({
              id: li.dataset.taskId,
              text: textSpan.innerHTML,
              checked: isChecked
            });
          }
        }
      });
      
      const order = lis.map(li => li.dataset.storageKey || li.dataset.taskId);
      localStorage.setItem(`order_ul_${ulIndex}`, JSON.stringify(order));
      localStorage.setItem(`new_tasks_ul_${ulIndex}`, JSON.stringify(newTasks));
    });
    
    if (saveBtnRef.current) {
      saveBtnRef.current.classList.remove(styles.saveButtonActive);
      saveBtnRef.current.innerHTML = '✅ Guardado';
    }

    if (msgRef.current) {
      msgRef.current.innerHTML = '¡Progreso guardado correctamente!';
      setTimeout(() => {
        if (msgRef.current) msgRef.current.innerHTML = '';
      }, 3000);
    }
  };

  return (
    <div className={styles.layout}>
      <style dangerouslySetInnerHTML={{ __html: htmlStyles }} />
      <main className={styles.mainContent}>
        
        <div className={styles.topBar}>
          <div>
            <h1 style={{ margin: 0, color: 'var(--dark)' }}>Cronograma Operativo</h1>
            <p style={{ margin: '5px 0 0 0', color: '#64748b' }}>Marca las tareas completadas, edítalas o añade nuevas (✏️ y 🗑️ al pasar el ratón). Guarda tu progreso.</p>
          </div>
          
          <div className={styles.saveContainer}>
            <span ref={msgRef} className={styles.savedMessage}></span>
            <button 
              ref={saveBtnRef}
              onClick={handleSave} 
              className={styles.saveButton}
            >
              ✅ Guardado
            </button>
          </div>
        </div>

        <div 
          ref={contentRef}
          className={`estrategia-doc page ${styles.htmlWrapper}`}
          dangerouslySetInnerHTML={{ __html: body }} 
        />
      </main>
    </div>
  );
}
