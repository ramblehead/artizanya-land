(set (make-local-variable 'tide-tsserver-executable)
     (concat (rh-project-get-root) "node_modules/.bin/tsserver"))

(set (make-local-variable 'tern-command)
     `(,(concat (rh-project-get-root) "node_modules/.bin/tern")))

(set (make-local-variable 'rh-tern-argument-hints-enabled) nil)

;; TODO: Test NODE_PATH and only add missing paths instead
;;       of overwriting all.
;; node.js arangodb require paths for tern
(setenv "NODE_PATH"
        (concat "/usr/share/arangodb3/js/common/modules:"
                "/usr/share/arangodb3/js/server/modules"))

(rh-foxx-ts-setup)
