# KA719Editor

## Introduction
The motivation behind developing this Chrome extension is rooted in a personal experience I had while learning AWS a few months ago. During the learning process, I encountered inconsistencies between the tutorial documents and the actual content on the web pages. For instance, the tutorial might instruct users to click on a button named 'Start,' but in reality, that button either didn't exist or had been renamed. This confusion not only affected me but also impacted other beginners.

To address this issue, I aim to create a tool that empowers tutorial authors to edit their content easily and effectively. The key focus of this tool is to enable authors to specify the content they care about without having to deal with complex CSS styles. By utilizing built-in Selenium, the extension will be able to identify elements on target web pages and compare them with the expected content provided by the authors.

With this Chrome extension, tutorial authors can now ensure that their content remains up-to-date and consistent, providing a better learning experience for beginners and avoiding potential confusion due to outdated instructions.

## Features
One of the core features of this tool is its user-friendliness, as authors won't require any front-end or CSS knowledge. Instead, they can simply specify the properties they are interested in, such as text, images, and links. The extension will then take care of the rest, notifying the author if any elements have changed and don't match the expected values.

## Prerequisites
- Chrome 88 or higher version, Firefox 109 or higher version