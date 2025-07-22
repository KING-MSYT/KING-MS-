// Command List Array
var commands = [];

// Main cmd function
function cmd(info, func) {
    // Set defaults
    info.function = func;
    if (!info.dontAddCommandList) info.dontAddCommandList = false;
    if (!info.desc) info.desc = '';
    if (!info.fromMe) info.fromMe = false;
    if (!info.category) info.category = 'misc';
    if (!info.filename) info.filename = "Not Provided";

    // Add restrictions flags (optional)
    info.onlyPm = info.onlyPm || false;         // Only private messages
    info.onlyGrp = info.onlyGrp || false;       // Only group messages
    info.onlyChannel = info.onlyChannel || false; // Only channel messages (broadcast)

    // Push to command list
    commands.push(info);
    return info;
}

// Helper to check context (used in your handler file)
function isAllowedContext(info, m) {
    const isGroup = m.isGroup;
    const isChannel = m.chat.endsWith('@broadcast');
    const isPrivate = !isGroup && !isChannel;

    if (info.onlyPm && !isPrivate) return false;
    if (info.onlyGrp && !isGroup) return false;
    if (info.onlyChannel && !isChannel) return false;

    return true;
}

// Export everything
module.exports = {
    cmd,
    AddCommand: cmd,
    Function: cmd,
    Module: cmd,
    commands,
    isAllowedContext
};
