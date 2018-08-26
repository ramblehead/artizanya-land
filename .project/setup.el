;; -*- coding: utf-8 -*-

(set (make-local-variable 'tide-tsserver-executable)
     (concat (rh-project-get-root) "node_modules/.bin/tsserver"))

;; (set (make-local-variable 'tern-command)
;;      (list (concat (rh-project-get-root) "node_modules/.bin/tern")))

(set (make-local-variable 'flycheck-typescript-tslint-executable)
     (concat (rh-project-get-root) "node_modules/.bin/tslint"))

;; (set (make-local-variable 'rh-tern-argument-hints-enabled) nil)

;; TODO: Test NODE_PATH and only add missing paths instead
;;       of overwriting all.
;; node.js arangodb require paths for tern
(setenv "NODE_PATH"
        (concat "/usr/share/arangodb3/js/common/modules:"
                "/usr/share/arangodb3/js/server/modules"))

(let ((project-root (rh-project-get-root))
      file-rpath)
  (when project-root
    (setq file-rpath (file-relative-name buffer-file-name project-root))
    (cond ((string-match-p "\\.ts\\'\\|\\.tsx\\'" file-rpath)
           (rh-typescript-setup))
          ((or (string-match-p "^#!.*node" (save-excursion
                                             (goto-char (point-min))
                                             (thing-at-point 'line t)))
               (string-match-p "\\.js\\'" file-rpath))
           (setq rh-js2-additional-externs
                 (append rh-js2-additional-externs
                         '("require" "module" "exports")))
           (rh-javascript-setup)))))
