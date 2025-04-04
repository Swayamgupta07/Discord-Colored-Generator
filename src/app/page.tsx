'use client';

import { useState, useRef } from 'react';
import { Button, Title, Text, Group, Stack, Box, Tooltip } from '@mantine/core';
import { useClipboard } from '@mantine/hooks';

export default function Home() {
  const textareaRef = useRef<HTMLDivElement>(null);
  const [copyCount, setCopyCount] = useState<number>(0);
  const [textareaContent, setTextareaContent] = useState<string>(
    'Welcome to <span class="ansi-33">Swayam</span> <span class="ansi-45"><span class="ansi-37">Discord</span></span> <span class="ansi-31">C</span><span class="ansi-32">o</span><span class="ansi-33">l</span><span class="ansi-34">o</span><span class="ansi-35">r</span><span class="ansi-36">e</span><span class="ansi-37">d</span> Text Generator!'
  );
  const clipboard = useClipboard({ timeout: 2000 });

  const ansiColors = {
    styles: [
      { label: 'Reset All', ansi: 0 },
      { label: 'Bold', ansi: 1, className: 'ansi-1' },
      { label: 'Line', ansi: 4, className: 'ansi-4' },
    ],
    fg: [
      { ansi: 30, color: '#4f545c', tooltip: 'Dark Gray (33%)' },
      { ansi: 31, color: '#dc322f', tooltip: 'Red' },
      { ansi: 32, color: '#859900', tooltip: 'Yellowish Green' },
      { ansi: 33, color: '#b58900', tooltip: 'Gold' },
      { ansi: 34, color: '#268bd2', tooltip: 'Light Blue' },
      { ansi: 35, color: '#d33682', tooltip: 'Pink' },
      { ansi: 36, color: '#2aa198', tooltip: 'Teal' },
      { ansi: 37, color: '#ffffff', tooltip: 'White' },
    ],
    bg: [
      { ansi: 40, color: '#002b36', tooltip: 'Blueish Black' },
      { ansi: 41, color: '#cb4b16', tooltip: 'Rust Brown' },
      { ansi: 42, color: '#586e75', tooltip: 'Gray (40%)' },
      { ansi: 43, color: '#657b83', tooltip: 'Gray (45%)' },
      { ansi: 44, color: '#839496', tooltip: 'Light Gray (55%)' },
      { ansi: 45, color: '#6c71c4', tooltip: 'Blurple' },
      { ansi: 46, color: '#93a1a1', tooltip: 'Light Gray (60%)' },
      { ansi: 47, color: '#fdf6e3', tooltip: 'Cream White' },
    ],
  };

  const handleInput = () => {
    const textarea = textareaRef.current;
    if (!textarea) return;
    const base = textarea.innerHTML.replace(/<(\/?(br|span|span class="ansi-[0-9]*"))>/g, "[$1]");
    if (base.includes("<") || base.includes(">")) {
      textarea.innerHTML = base.replace(/<.*?>/g, "").replace(/[<>]/g, "").replace(/\[(\/?(br|span|span class="ansi-[0-9]*"))\]/g, "<$1>");
    }
    setTextareaContent(textarea.innerHTML); 
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter') {
      document.execCommand('insertLineBreak');
      event.preventDefault();
    }
  };

  const applyStyle = (ansiCode: number) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    if (ansiCode === 0) {
      const resetContent = 'Welcome to <span class="ansi-33">Swayam</span> <span class="ansi-45"><span class="ansi-37">Discord</span></span> <span class="ansi-31">C</span><span class="ansi-32">o</span><span class="ansi-33">l</span><span class="ansi-34">o</span><span class="ansi-35">r</span><span class="ansi-36">e</span><span class="ansi-37">d</span> Text Generator!';
      textarea.innerHTML = resetContent;
      setTextareaContent(resetContent);
      return;
    }

    const selection = window.getSelection();
    if (!selection || selection.toString().length === 0) return;
    const range = selection.getRangeAt(0);
    const selectedText = selection.toString();
    const parentNode = range.commonAncestorContainer.parentElement;
    const isFgStyle = ansiCode >= 30 && ansiCode < 40;
    const isBgStyle = ansiCode >= 40 && ansiCode < 50;

    const newSpan = document.createElement("span");
    newSpan.classList.add(`ansi-${ansiCode}`);
    newSpan.innerText = selectedText;

    if (parentNode && parentNode !== textarea && parentNode.className?.startsWith("ansi-")) {
      const parentClass = parentNode.className;
      const parentAnsiCode = parseInt(parentClass.split("-")[1], 10);
      const isParentFg = parentAnsiCode >= 30 && parentAnsiCode < 40;
      const isParentBg = parentAnsiCode >= 40 && parentAnsiCode < 50;

      if (isFgStyle && isParentBg) {
        range.deleteContents();
        range.insertNode(newSpan);
      } else if (isBgStyle && isParentFg) {
        const newBgSpan = document.createElement("span");
        newBgSpan.classList.add(`ansi-${ansiCode}`);
        range.deleteContents();
        newBgSpan.appendChild(newSpan);
        range.insertNode(newBgSpan);
      } else {
        range.deleteContents();
        range.insertNode(newSpan);
      }
    } else {
      range.deleteContents();
      range.insertNode(newSpan);
    }
    range.selectNodeContents(newSpan);
    selection.removeAllRanges();
    selection.addRange(range);

    setTextareaContent(textarea.innerHTML);
  };

  const nodesToANSI = (nodes: NodeListOf<Node>, states: { fg: number; bg: number; st: number }[]): string => {
    let text = "";
    for (const node of Array.from(nodes)) {
      if (node.nodeType === 3) {
        text += node.textContent;
        continue;
      }
      if (node.nodeName === "BR") {
        text += "\n";
        continue;
      }
      if (node instanceof Element && node.className) {
        const className = node.className as string;
        if (className.startsWith("ansi-")) {
          const ansiCode = +(className.split("-")[1]);
          const newState = { ...states[states.length - 1] };
          if (ansiCode < 30) newState.st = ansiCode; 
          if (ansiCode >= 30 && ansiCode < 40) newState.fg = ansiCode;
          if (ansiCode >= 40) newState.bg = ansiCode; 

          states.push(newState);
          let ansiSequence = "";
          if (ansiCode < 30) {
            ansiSequence = `\x1b[${ansiCode}m`;
          } else {
            ansiSequence = `\x1b[${newState.st};${ansiCode >= 40 ? newState.bg : newState.fg}m`;
          }
          text += ansiSequence;
          text += nodesToANSI(node.childNodes, states);
          states.pop();
          text += `\x1b[0m`; 
          const prevState = states[states.length - 1];
          let reapplySequence = "";
          if (prevState.fg !== 2) reapplySequence += `\x1b[${prevState.fg}m`;
          if (prevState.bg !== 2) reapplySequence += `\x1b[${prevState.bg}m`;
          if (reapplySequence) text += reapplySequence;
        } else {
          text += nodesToANSI(node.childNodes, states);
        }
      } else {
        if (node.childNodes) {
          text += nodesToANSI(node.childNodes, states);
        }
      }
    }
    return text;
  };

  const handleCopy = () => {
    const textarea = textareaRef.current;
    if (!textarea) return;
    const toCopy = "```ansi\n" + nodesToANSI(textarea.childNodes, [{ fg: 2, bg: 2, st: 2 }]) + "\n```";
    clipboard.copy(toCopy);
    setCopyCount((prev) => Math.min(11, prev + 1));
    setTimeout(() => setCopyCount(0), 2000);
  };

  const funnyCopyMessages = [
    "Copied!",
    "Double Copy!",
    "Triple Copy!",
    "Dominating!!",
    "Rampage!!",
    "Mega Copy!!",
    "Unstoppable!!",
    "Wicked Sick!!",
    "Monster Copy!!!",
    "GODLIKE!!!",
    "BEYOND GODLIKE!!!!",
    Array(16).fill(0).reduce((p) => p + String.fromCharCode(Math.floor(Math.random() * 65535)), ""),
  ];

  return (
    <Box p="md" className="container">
      <Stack align="center" gap="xl">
        <Title order={1}>
          <span style={{ color: '#5865F2' }}>Discord </span> Colored Text Generator
        </Title>

        <Title order={2}>Create your text</Title>

        <Group gap="xs">
          {ansiColors.styles.map((style) => (
            <Button
              key={style.ansi}
              className={`button ${style.className || ''}`}
              onClick={() => applyStyle(style.ansi)}
            >
              {style.label}
            </Button>
          ))}
        </Group>

        <Group gap="xs">
          <Text fw={700}>FG</Text>
          {ansiColors.fg.map((color) => (
            <Tooltip key={color.ansi} label={color.tooltip}>
              <Button
                variant="filled"
                style={{ backgroundColor: color.color }}
                onClick={() => applyStyle(color.ansi)}
                className="color-button"
              >
                {' '}
              </Button>
            </Tooltip>
          ))}
        </Group>

        <Group gap="xs">
          <Text fw={700}>BG</Text>
          {ansiColors.bg.map((color) => (
            <Tooltip key={color.ansi} label={color.tooltip}>
              <Button
                variant="filled"
                style={{ backgroundColor: color.color }}
                onClick={() => applyStyle(color.ansi)}
                className="color-button"
              >
                {' '}
              </Button>
            </Tooltip>
          ))}
        </Group>

        <Box className="flex">
          <div
            id="textarea"
            ref={textareaRef}
            contentEditable
            onInput={handleInput}
            onKeyDown={handleKeyDown}
            className="textarea"
            dangerouslySetInnerHTML={{ __html: textareaContent }}
          />
        </Box>

        <Box pt="md">
          <Button
            className="button"
            onClick={handleCopy}
            style={{
              backgroundColor: copyCount > 0 ? (copyCount <= 8 ? '#3BA55D' : '#ED4245') : '#4f545c',
            }}
          >
            {copyCount > 0 ? funnyCopyMessages[copyCount - 1] : 'Copy text as Discord formatted'}
          </Button>
        </Box>
      </Stack>
    </Box>
  );
}