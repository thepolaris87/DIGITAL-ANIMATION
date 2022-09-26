import Blockly from 'blockly';
import workspace from '../../components/workspace';

function onFirstComment(event) {
    if (event.type === Blockly.Events.BLOCK_CHANGE &&
        event.element === 'comment' &&
        !event.oldValue && event.newValue) {
      alert('Congratulations on creating your first comment!')
      workspace.removeChangeListener(onFirstComment);
    }
  }
  workspace.addChangeListener(onFirstComment);